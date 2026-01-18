import React from 'react';
import { prisma } from '@/lib/prisma';
import MenuClient, { MenuItem } from './MenuClient';

export const revalidate = 60; // Cache for 1 minute for easier dev updates

export default async function MenuPage() {
    try {
        const items = await prisma.menuItem.findMany({
            orderBy: { created_at: 'desc' },
            include: {
                // Fetch included items (recipe)
                included_items: {
                    include: {
                        option: true
                    }
                },
                // Fetch modifier groups for customization
                modifier_groups: {
                    include: {
                        modifier: {
                            include: {
                                options: true
                            }
                        }
                    },
                    orderBy: {
                        modifier: {
                            key: 'asc' // Sort or use specific logic if added
                        }
                    }
                }
            }
        });

        // Transform Data
        const menuItems: MenuItem[] = items.map((item) => {
            const normalizedCat = normalizeCategory(item.category);
            return {
                id: item.id,
                name: item.name, // Will need to title-case this in client or here
                description: item.description || '',
                price: item.price.toString(), // Convert number to string if needed by client, or keep as number. Client expects string "$X" currently, let's normalise.
                category: normalizedCat,
                image: item.image_url || '/fresh_bowl_assembly_dark.png',
                chefNote: item.chef_note || '',
                isSignature: item.is_signature,
                includedItems: item.included_items.map(inc => inc.option.name),
                modifierGroups: item.modifier_groups.map(group => ({
                    id: group.id,
                    name: group.title_override || group.modifier.name,
                    min: group.min_select,
                    max: group.max_select,
                    required: group.required,
                    options: group.modifier.options.map(opt => ({
                        id: opt.id,
                        name: opt.name,
                        price: opt.price_adjustment
                    }))
                }))
            };
        });

        return <MenuClient initialMenuItems={menuItems} />;
    } catch (error) {
        console.error('Failed to fetch menu items:', error);
        return <MenuClient initialMenuItems={[]} />;
    }
}

function normalizeCategory(cat: string): string {
    // DB has "Habiburrito Bowls" -> "Bowls"
    const lower = cat.toLowerCase();
    if (lower.includes('quesadilla')) return 'Quesadillas';
    if (lower.includes('bowl')) return 'Bowls';
    // 'habiburrito' contains 'burrito', so check this last or be specific
    if (lower.includes('burrito') && !lower.includes('habiburrito')) return 'Burritos';
    // Fallback for wraps or others if we want them as Burritos? 
    // Actually, let's just leave the simple check but last.
    if (lower.includes('burrito')) return 'Burritos';

    if (lower.includes('sides')) return 'Sides';
    return cat; // Fallback
}
