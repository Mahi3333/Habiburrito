import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // 1. Check Manual Override (AppSetting)
    const settings = await prisma.appSetting.findUnique({
      where: { id: 1 },
    });

    if (settings && !settings.online_ordering_enabled) {
      return NextResponse.json({
        isOpen: false,
        reason: 'MANUAL_OVERRIDE',
        message: settings.override_message || 'Due to high order volume, online ordering is temporarily paused.',
        nextOpenTime: 'Check back soon'
      });
    }

    // 2. Check Schedule (StoreHour)
    const now = new Date();
    // Convert to EST/Store Time (Assuming store is in EST based on previous context, but for now using system time 
    // to match server/client sync. Ideally use a library like date-fns-tz)
    const dayName = now.toLocaleDateString('en-US', { weekday: 'long' });

    const schedule = await prisma.storeHour.findUnique({
      where: { day: dayName },
    });

    if (!schedule || schedule.closed) {
      return NextResponse.json({
        isOpen: false,
        reason: 'SCHEDULE_CLOSED',
        message: 'We are currently closed.',
        nextOpenTime: 'Tomorrow' // simplified for now
      });
    }

    const toMinutes = (t: string) => {
      const [h, m] = t.split(':').map(Number);
      return h * 60 + m;
    };

    const to12h = (t: string) => {
      const [h, m] = t.split(':').map(Number);
      const period = h >= 12 && h !== 24 ? 'PM' : 'AM';
      let hour = h % 12;
      if (hour === 0) hour = 12;
      return `${hour}:${m.toString().padStart(2, '0')} ${period}`;
    };

    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const openMinutes = toMinutes(schedule.open_time);
    const closeMinutes = toMinutes(schedule.close_time);

    if (currentMinutes < openMinutes || currentMinutes >= closeMinutes) {
      return NextResponse.json({
        isOpen: false,
        reason: 'SCHEDULE_CLOSED',
        message: `We open at ${to12h(schedule.open_time)}`,
        nextOpenTime: to12h(schedule.open_time)
      });
    }

    return NextResponse.json({
      isOpen: true,
      reason: 'OPEN',
      message: 'Ordering is Open',
      nextOpenTime: ''
    });

  } catch (error) {
    console.error('Store status error:', error);
    // Fail open or closed? Safe to fail "Open" but warn, or "Closed" to prevent issues?
    // Let's return closed to be safe if DB fails.
    return NextResponse.json({ isOpen: false, reason: 'ERROR', message: 'System maintenance' }, { status: 500 });
  }
}
