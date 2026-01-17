import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const users = await prisma.user.findMany({
            orderBy: {
                created_at: 'desc',
            },
            // You might want to exclude password_hash in the future using select
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                role: true,
                rewards_points: true,
                created_at: true,
                _count: {
                    select: { orders: true }
                }
            },
            take: 100
        });

        return NextResponse.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }
}
