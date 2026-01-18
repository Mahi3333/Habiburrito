import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type ParamsPromise = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: ParamsPromise) {
    const { id: idParam } = await params;
    const id = Number(idParam);
    if (Number.isNaN(id)) {
        return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
    }

    try {
        const groups = await prisma.menuItemModifierGroup.findMany({
            where: { menu_item_id: id },
            include: {
                modifier: {
                    include: { options: true }
                }
            },
            orderBy: { id: 'asc' } // Or maintain a specific sort order if added to schema
        });
        return NextResponse.json(groups);
    } catch (error) {
        console.error('Error fetching item modifiers:', error);
        return NextResponse.json({ error: 'Failed to fetch item modifiers' }, { status: 500 });
    }
}

export async function POST(request: NextRequest, { params }: ParamsPromise) {
    const { id: idParam } = await params;
    const menuItemId = Number(idParam);

    if (Number.isNaN(menuItemId)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });

    try {
        const body = await request.json();

        // Link an existing Modifier Group to this Item
        const link = await prisma.menuItemModifierGroup.create({
            data: {
                menu_item_id: menuItemId,
                modifier_id: body.modifier_id,
                required: body.required ?? false,
                min_select: body.min_select ?? 0,
                max_select: body.max_select ?? 1,
                title_override: body.title_override, // e.g. "Choose Your Protein" instead of just "Proteins"
            },
            include: {
                modifier: { include: { options: true } }
            }
        });

        return NextResponse.json(link);
    } catch (error) {
        console.error('Error linking modifier to item:', error);
        return NextResponse.json({ error: 'Failed to link modifier' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: ParamsPromise) {
    // Expected to receive Group ID in searchParams or similar, 
    // but usually DELETE is on a specific resource URL. 
    // For simplicity, we might handle deletions via a separate route or ID check here
    // For now, let's assume we pass the link ID in the body or query.
    const url = new URL(request.url);
    const linkId = Number(url.searchParams.get('linkId'));

    if (!linkId) return NextResponse.json({ error: 'Link ID required' }, { status: 400 });

    try {
        await prisma.menuItemModifierGroup.delete({
            where: { id: linkId }
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete link' }, { status: 500 });
    }
}
