import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

import { getMockRevenueData } from '@/lib/stripe';

export async function GET() {
  const { userId } = auth();

  // Check if user is authenticated
  if (!userId) {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  try {
    // In a real app, you would fetch this data from Stripe
    // For MVP, we'll use mock data
    const revenueData = getMockRevenueData();

    return NextResponse.json(revenueData);
  } catch (error) {
    console.error('Error fetching revenue data:', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to fetch revenue data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
