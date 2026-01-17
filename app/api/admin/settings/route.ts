import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const settings = await prisma.appSetting.findUnique({
            where: { id: 1 },
        });
        return NextResponse.json(settings || { online_ordering_enabled: true, override_message: '' });
    } catch (error) {
        console.error('Failed to fetching store settings', error);
        return NextResponse.error();
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const settings = await prisma.appSetting.upsert({
            where: { id: 1 },
            update: {
                online_ordering_enabled: body.online_ordering_enabled,
                override_message: body.override_message,
            },
            create: {
                id: 1,
                online_ordering_enabled: body.online_ordering_enabled,
                override_message: body.override_message,
            },
        });
        return NextResponse.json(settings);
    } catch (error) {
        console.error('Failed to update store settings', error);
        return NextResponse.error();
    }
}
