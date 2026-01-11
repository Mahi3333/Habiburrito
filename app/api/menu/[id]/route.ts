import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

type Params = { params: { id: string } };

export async function GET(_request: NextRequest, { params }: Params) {
    const id = Number(params.id);
    if (Number.isNaN(id)) {
        return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
    }
    try {
        const item = await prisma.menuItem.findUnique({ where: { id } });
        if (!item) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }
        return NextResponse.json(item);
    } catch (error) {
        console.error('Error fetching menu item:', error);
        return NextResponse.json({ error: 'Failed to fetch menu item' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: Params) {
    const id = Number(params.id);
    if (Number.isNaN(id)) {
        return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
    }
    try {
        const body = await request.json();
        const item = await prisma.menuItem.update({
            where: { id },
            data: {
                name: body.name,
                description: body.description,
                price: parseFloat(body.price),
                category: body.category,
                image_url: body.image_url,
                chef_note: body.chef_note,
                is_signature: body.is_signature,
                is_available: body.is_available,
            },
        });
        return NextResponse.json(item);
    } catch (error) {
        console.error('Error updating menu item:', error);
        return NextResponse.json({ error: 'Failed to update menu item' }, { status: 500 });
    }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
    const id = Number(params.id);
    if (Number.isNaN(id)) {
        return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
    }
    try {
        await prisma.menuItem.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting menu item:', error);
        return NextResponse.json({ error: 'Failed to delete menu item' }, { status: 500 });
    }
}
