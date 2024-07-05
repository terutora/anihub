import { NextResponse } from 'next/server';
import { fetchAnimeDetail } from '@/lib/annict-client';

export async function GET(request, { params }) {
  const { id } = params;

  console.log('API route: Received request for anime ID:', id);

  try {
    const animeDetail = await fetchAnimeDetail(id);
    console.log('API route: Fetched anime detail:', animeDetail);
    
    if (animeDetail) {
      return NextResponse.json(animeDetail);
    } else {
      console.log('API route: Anime not found');
      return NextResponse.json({ error: 'Anime not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('API route: Error fetching anime detail:', error);
    return NextResponse.json({ error: 'Failed to fetch anime detail', details: error.message }, { status: 500 });
  }
}