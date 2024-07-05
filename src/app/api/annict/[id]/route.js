import { NextResponse } from 'next/server';
import { fetchAnimeDetail } from '@/lib/annict-client';

export async function GET(request, { params }) {
  const { id } = params;

  console.log('Fetching anime detail for id:', id);

  try {
    const animeDetail = await fetchAnimeDetail(id);
    console.log('Anime detail fetched:', animeDetail);
    return NextResponse.json(animeDetail);
  } catch (error) {
    console.error('Error in Annict anime detail API route:', error);
    return NextResponse.json({ error: 'Failed to fetch anime detail', details: error.message }, { status: 500 });
  }
}