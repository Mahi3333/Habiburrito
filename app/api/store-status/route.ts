import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Mapping JS day index (0=Sunday) to our DB string
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // 1. Check Global Override
    const settings = await prisma.appSetting.findFirst();

    if (settings?.online_ordering_enabled === false) {
      return NextResponse.json({
        isOpen: false,
        reason: 'MANUAL_OVERRIDE',
        message: settings.override_message || 'Online ordering is currently paused.'
      });
    }

    // 2. Check Schedule
    // Since we are server-side, we need to be careful with Timezones. 
    // Ideally DB stores UTC or we assume Store Local Time.
    // For simplicity, let's assume server is in store's timezone or we handle it manually.
    // Or store simple strings "11:00" and compare with current time in specific TZ.

    // Use a fixed Timezone for the store, e.g. America/New_York
    const storeTimeZone = 'America/New_York'; // Adjust as needed
    const now = new Date();
    const localTimeStr = now.toLocaleTimeString('en-US', { hour12: false, timeZone: storeTimeZone }); // "14:30:00"

    // Fix: 'numeric' is not valid for weekday. Use 'long' to get name, or getDay() if using local time.
    // Since we want Store TZ day, we format to name.
    const formatter = new Intl.DateTimeFormat('en-US', { weekday: 'long', timeZone: storeTimeZone });
    const currentDayName = formatter.format(now);
    const localDayIndex = days.indexOf(currentDayName);

    const todayHours = await prisma.storeHour.findUnique({
      where: { day: currentDayName }
    });

    if (!todayHours || todayHours.closed) {
      return NextResponse.json({
        isOpen: false,
        reason: 'SCHEDULED_CLOSE',
        message: 'We are currently closed.'
      });
    }

    // Parse times "11:00" -> compare with current "HH:mm"
    const currentHM = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: storeTimeZone });

    const isOpen = currentHM >= todayHours.open_time && currentHM < todayHours.close_time;

    return NextResponse.json({
      isOpen,
      reason: isOpen ? 'OPEN' : 'SCHEDULED_CLOSE',
      openTime: todayHours.open_time,
      closeTime: todayHours.close_time,
      message: isOpen ? 'We are open!' : `We open at ${todayHours.open_time}`
    });

  } catch (error) {
    console.error('Store status error:', error);
    return NextResponse.json({ isOpen: false, reason: 'ERROR' }, { status: 500 });
  }
}
