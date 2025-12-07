import React from 'react';
import { prisma } from '../../lib/prisma';
import MenuClient from './MenuClient';
import { MenuItem as PrismaMenuItem } from '@prisma/client';

export const revalidate = 3600; // Cache for 1 hour

export default async function MenuPage() {
    interface MenuItem {
        id: number;
        name: string;
        description: string;
        price: string;
        category: string;
        image: string;
        chefNote: string;
        isSignature: boolean;
    }

    // Temporary interface to match actual DB schema, bypassing stale Prisma client types
    interface DBMenuItem {
        id: number;
        name: string;
        description: string | null;
        price: number;
        category: string;
        image_url: string | null;
        chef_note: string | null;
        is_signature: boolean;
        created_at: Date;
    }

    let menuItems: MenuItem[] = [];

    try {
        const items = await prisma.menuItem.findMany({
            orderBy: { created_at: 'desc' } as any
        }) as unknown as DBMenuItem[];

        menuItems = items.map((item) => ({
            id: item.id,
            name: item.name,
            description: item.description || '',
            price: `$${item.price.toFixed(2)}`,
            category: item.category,
            image: item.image_url || '/fresh_bowl_assembly_dark.png',
            chefNote: item.chef_note || '',
            isSignature: item.is_signature
        }));
    } catch (error) {
        console.error('Failed to fetch menu items:', error);
        // Fallback to empty array or handle error appropriately
    }

    return <MenuClient initialMenuItems={menuItems} />;
}
