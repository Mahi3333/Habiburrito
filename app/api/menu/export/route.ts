import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const escapeCsv = (value: string | number | boolean | null | undefined) => {
    const str = value === null || value === undefined ? '' : String(value);
    if (str.includes('"') || str.includes(',') || str.includes('\n')) {
        return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
};

export async function GET() {
    try {
        const items = await prisma.menuItem.findMany({
            orderBy: { id: 'asc' },
        });

        const header = [
            'id',
            'name',
            'description',
            'price',
            'category',
            'image_url',
            'chef_note',
            'is_signature',
            'is_available',
            'created_at',
            'updated_at',
        ];

        const rows = items.map((item) =>
            [
                escapeCsv(item.id),
                escapeCsv(item.name),
                escapeCsv(item.description),
                escapeCsv(item.price),
                escapeCsv(item.category),
                escapeCsv(item.image_url),
                escapeCsv(item.chef_note),
                escapeCsv(item.is_signature),
                escapeCsv(item.is_available),
                escapeCsv(item.created_at.toISOString()),
                escapeCsv(item.updated_at.toISOString()),
            ].join(',')
        );

        const csv = [header.join(','), ...rows].join('\n');

        return new NextResponse(csv, {
            status: 200,
            headers: {
                'Content-Type': 'text/csv; charset=utf-8',
                'Content-Disposition': 'attachment; filename=\"menu-export.csv\"',
            },
        });
    } catch (error) {
        console.error('Error exporting menu items:', error);
        return NextResponse.json({ error: 'Failed to export menu' }, { status: 500 });
    }
}
