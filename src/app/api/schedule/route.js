import { NextResponse } from 'next/server';
import { fetchAnimeSchedule } from '@/lib/api-client';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const start = new Date(searchParams.get('start'));
  const end = new Date(searchParams.get('end'));

  try {
    const schedules = await fetchAnimeSchedule(start, end);
    return NextResponse.json(schedules);
  } catch (error) {
    console.error('Error in schedule API route:', error);
    return NextResponse.json({ error: 'Failed to fetch schedule' }, { status: 500 });
  }
}