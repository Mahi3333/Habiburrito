import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const modifiers = await prisma.modifier.findMany({
            include: {
                options: true
            },
            orderBy: { name: 'asc' }
        });
        return NextResponse.json(modifiers);
    } catch (error) {
        console.error('Error fetching modifiers:', error);
        return NextResponse.json({ error: 'Failed to fetch modifiers' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Basic validation
        if (!body.name || !body.options || !Array.isArray(body.options)) {
            return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
        }

        const modifier = await prisma.modifier.create({
            data: {
                key: body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                name: body.name,
                max_selection: body.max_selection || 1,
                type: body.type || 'SELECT',
                options: {
                    create: body.options.map((opt: any) => ({
                        key: opt.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                        name: opt.name,
                        price_adjustment: Number(opt.price_adjustment) || 0,
                    }))
                }
            },
            include: {
                options: true
            }
        });

        return NextResponse.json(modifier);
    } catch (error) {
        console.error('Error creating modifier:', error);
        return NextResponse.json({ error: 'Failed to create modifier' }, { status: 500 });
    }
}
