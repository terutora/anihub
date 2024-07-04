import { NextResponse } from 'next/server';
import { fetchCurrentAnimeSchedule } from '@/lib/syobocal-client';

export async function GET(request) {
  try {
    const schedules = await fetchCurrentAnimeSchedule();
    return NextResponse.json(schedules);
  } catch (error) {
    console.error('Error in Syobocal API route:', error);
    return NextResponse.json({ error: 'Failed to fetch Syobocal data', details: error.message }, { status: 500 });
  }
}