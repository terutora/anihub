import { NextResponse } from 'next/server';
import { fetchAnnictData } from '@/lib/annict-client';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  try {
    const animeList = await fetchAnnictData(query);
    return NextResponse.json(animeList);
  } catch (error) {
    console.error('Error in search API route:', error);
    return NextResponse.json({ error: 'Failed to fetch search results' }, { status: 500 });
  }
}