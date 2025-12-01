import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const orders = await prisma.order.findMany({
            take: 20,
            orderBy: {
                created_at: 'desc',
            },
            include: {
                items: true,
            },
        });

        return NextResponse.json({ orders }, { status: 200 });
    } catch (error) {
        console.error('Error fetching orders:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
