import { NextResponse } from "next/server";
import { fetchCurrentSeasonAnime, fetchCurrentAnimeSchedule } from "@/lib/api-client";

export async function GET(request) {
  try {
    const [annictData, syobocalData] = await Promise.all([fetchCurrentSeasonAnime(), fetchCurrentAnimeSchedule()]);

    // ここで必要に応じてデータを組み合わせたり加工したりできます
    return NextResponse.json({ annict: annictData, syobocal: syobocalData });
  } catch (error) {
    console.error("Error in anime schedule API route:", error);
    return NextResponse.json({ error: "Failed to fetch anime data", details: error.message }, { status: 500 });
  }
}
