import { NextResponse } from 'next/server';
import { getStoreStatus } from '../../lib/storeStatus';

export async function GET() {
  try {
    const status = await getStoreStatus();
    return NextResponse.json(status, {
      headers: {
        'Cache-Control': 'no-store',
      },
    });
  } catch (e) {
    return NextResponse.json({
      isOpen: true,
      isOrderingAllowed: true,
      dayName: '',
      openTimeLabel: '',
      closeTimeLabel: '',
      message: '',
    });
  }
}
