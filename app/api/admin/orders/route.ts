import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Adjust import based on your project structure

export async function GET() {
    try {
        const orders = await prisma.order.findMany({
            orderBy: {
                created_at: 'desc',
            },
            include: {
                user: true,
                items: true
            },
            take: 100 // Limit to recent 100 orders for performance
        });

        return NextResponse.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
    }
}
