import { NextResponse } from 'next/server';
import { fetchCurrentSeasonAnime } from '@/lib/annict-client';

export async function GET(request) {
  try {
    const animeList = await fetchCurrentSeasonAnime();
    return NextResponse.json(animeList);
  } catch (error) {
    console.error('Error in Annict API route:', error);
    return NextResponse.json({ error: 'Failed to fetch Annict data', details: error.message }, { status: 500 });
  }
}