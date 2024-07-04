import { NextResponse } from 'next/server';

// この関数は実際のデータソース（データベースやしょぼいカレンダーAPI）から
// スケジュールを取得する処理に置き換えてください
async function getScheduleFromDataSource(start, end) {
  // ダミーデータ
  return [
    { time: new Date('2024-07-04T20:00:00'), title: "Attack on Titan" },
    { time: new Date('2024-07-04T21:30:00'), title: "My Hero Academia" },
    { time: new Date('2024-07-04T22:00:00'), title: "Demon Slayer" },
    { time: new Date('2024-07-04T23:00:00'), title: "One Piece" },
  ];
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const start = new Date(searchParams.get('start'));
  const end = new Date(searchParams.get('end'));

  const allSchedules = await getScheduleFromDataSource(start, end);

  const filteredSchedules = allSchedules.filter(schedule => 
    schedule.time >= start && schedule.time <= end
  );

  return NextResponse.json(filteredSchedules);
}