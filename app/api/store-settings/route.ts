import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
  try {
    const settings = await prisma.appSetting.findFirst();
    const hours = await prisma.storeHour.findMany();
    return NextResponse.json({ settings, hours });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { online_ordering_enabled, override_message, hours } = body;

    const setting = await prisma.appSetting.upsert({
      where: { id: 1 },
      update: {
        online_ordering_enabled: online_ordering_enabled ?? true,
        override_message: override_message ?? null,
      },
      create: {
        id: 1,
        online_ordering_enabled: online_ordering_enabled ?? true,
        override_message: override_message ?? null,
      },
    });

    if (Array.isArray(hours)) {
      for (const h of hours) {
        if (!h.day || !h.open_time || !h.close_time) continue;
        await prisma.storeHour.upsert({
          where: { day: h.day },
          update: { open_time: h.open_time, close_time: h.close_time, closed: !!h.closed },
          create: { day: h.day, open_time: h.open_time, close_time: h.close_time, closed: !!h.closed },
        });
      }
    }

    return NextResponse.json({ settings: setting });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
