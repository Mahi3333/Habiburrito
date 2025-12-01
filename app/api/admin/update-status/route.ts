import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { orderId, status } = body;

        if (!orderId || !status) {
            return NextResponse.json(
                { error: 'Order ID and Status are required' },
                { status: 400 }
            );
        }

        const updatedOrder = await prisma.order.update({
            where: { id: parseInt(orderId) },
            data: { status },
        });

        return NextResponse.json({ success: true, order: updatedOrder }, { status: 200 });
    } catch (error) {
        console.error('Error updating order status:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
