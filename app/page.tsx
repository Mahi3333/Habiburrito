import { PrismaClient } from '@prisma/client';
import HomeClient, { DisplayItem } from './HomeClient';
import { prisma } from '@/lib/prisma'; // Use existing lib instance

export const dynamic = 'force-dynamic'; // Ensure fresh data on each request

export default async function Home() {
  // Fetch data for various sections

  // 1. Trending Items (e.g., Signature items, limiting to 5)
  const trendingDbItems = await prisma.menuItem.findMany({
    where: {
      is_available: true,
      image_url: { not: null } // Ensure image exists
    },
    take: 5,
    orderBy: { updated_at: 'desc' } // Just an example sort
  });

  const trendingItems: DisplayItem[] = trendingDbItems.map(item => ({
    title: item.name,
    price: `$${item.price}`,
    img: item.image_url || '/fresh_bowl_assembly_dark.png' // Fallback
  }));


  // 2. Chef's Table (Items with chef notes)
  const chefDbItems = await prisma.menuItem.findMany({
    where: {
      is_available: true,
      chef_note: { not: null }
    },
    take: 4,
    orderBy: { created_at: 'desc' }
  });

  const chefItems: DisplayItem[] = chefDbItems.map(item => ({
    title: item.name,
    price: `$${item.price}`,
    img: item.image_url || '/fresh_bowl_assembly_dark.png',
    note: item.chef_note || ''
  }));


  // 3. Fan Favorites (Based on Order Volume)
  // Aggregate order items to find top sellers
  const topOrdered = await prisma.orderItem.groupBy({
    by: ['item_name'],
    _sum: {
      quantity: true
    },
    orderBy: {
      _sum: {
        quantity: 'desc'
      }
    },
    take: 10
  });

  let validFanFavorites: DisplayItem[] = [];

  if (topOrdered.length > 0) {
    // If we have orders, fetch details for these items
    const names = topOrdered.map(o => o.item_name);
    const dbItems = await prisma.menuItem.findMany({
      where: {
        name: { in: names },
        is_available: true
      }
    });

    // Map back to maintain order of popularity
    const mappedItems = names.map(name => {
      const item = dbItems.find(i => i.name === name);
      if (!item) return null;
      return {
        title: item.name,
        price: `$${item.price}`,
        img: item.image_url || '/fresh_bowl_assembly_dark.png',
        tag: 'Top Seller'
      };
    });

    // Filter out nulls safely
    validFanFavorites = mappedItems.filter((item): item is DisplayItem => item !== null);
  }

  // Fallback: If no orders or not enough data, use Signature items
  if (validFanFavorites.length < 5) {
    const signatureItems = await prisma.menuItem.findMany({
      where: {
        is_available: true,
        is_signature: true
      },
      take: 10
    });

    const signatureDisplayItems: DisplayItem[] = signatureItems.map(item => ({
      title: item.name,
      price: `$${item.price}`,
      img: item.image_url || '/fresh_bowl_assembly_dark.png',
      tag: 'Signature'
    }));

    // Merge unique items, prioritizing actual orders
    const existingNames = new Set(validFanFavorites.map(i => i.title));
    for (const item of signatureDisplayItems) {
      if (!existingNames.has(item.title)) {
        validFanFavorites.push(item);
      }
    }
  }

  // Final fallback: Use any items if we still don't have enough
  if (validFanFavorites.length < 5) {
    const anyItems = await prisma.menuItem.findMany({
      where: { is_available: true },
      take: 10
    });
    const anyDisplayItems: DisplayItem[] = anyItems.map(item => ({
      title: item.name,
      price: `$${item.price}`,
      img: item.image_url || '/fresh_bowl_assembly_dark.png',
      tag: 'Trending'
    }));
    // Merge again
    const existingNames = new Set(validFanFavorites.map(i => i.title));
    for (const item of anyDisplayItems) {
      if (!existingNames.has(item.title)) {
        validFanFavorites.push(item);
      }
    }
  }

  const fanFavorites = validFanFavorites;


  // 4. Showcase Items (Grid - All items with images)
  // Need ~14 items for the grid layout
  const showcaseDbItems = await prisma.menuItem.findMany({
    where: {
      is_available: true,
      image_url: { not: null }
    },
    take: 14,
    orderBy: { id: 'asc' }
  });

  const showcaseItems: DisplayItem[] = showcaseDbItems.map(item => ({
    title: item.name,
    img: item.image_url || '/fresh_bowl_assembly_dark.png'
  }));


  return (
    <HomeClient
      trendingItems={trendingItems}
      showcaseItems={showcaseItems}
      chefItems={chefItems}
      fanFavorites={fanFavorites}
    />
  );
}
