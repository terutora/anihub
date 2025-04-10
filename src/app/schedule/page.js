"use client";

import React, { useState, useEffect, Suspense } from "react";
import { fetchSyobocalData } from "@/lib/api-client";
import { Clock, Tv } from "lucide-react";

// スケジュールコンテンツコンポーネント
const ScheduleContent = () => {
  const [schedules, setSchedules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        setIsLoading(true);
        const data = await fetchSyobocalData();
        setSchedules(data);
      } catch (error) {
        console.error("Error fetching schedule:", error);
        setError("スケジュールの取得に失敗しました。後でもう一度お試しください。");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  // スケジュールを日付でグループ化する関数
  const groupSchedulesByDate = (schedules) => {
    return schedules.reduce((groups, schedule) => {
      const date = new Date(schedule.date).toLocaleDateString("ja-JP", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      if (!groups[date]) {
        groups[date] = [];
      }

      groups[date].push(schedule);
      return groups;
    }, {});
  };

  if (isLoading) return <div className="flex justify-center items-center h-64">読み込み中...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  const groupedSchedules = groupSchedulesByDate(schedules);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">アニメ放送スケジュール</h1>

      {Object.keys(groupedSchedules).length > 0 ? (
        Object.entries(groupedSchedules).map(([date, schedules]) => (
          <div key={date} className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{date}</h2>
            <div className="bg-white rounded-lg shadow-md p-4">
              <ul className="divide-y divide-gray-200">
                {schedules.map((schedule, index) => (
                  <li key={index} className="py-4">
                    <div className="flex items-center">
                      <Tv className="w-5 h-5 text-blue-500 mr-3" />
                      <div>
                        <p className="font-medium">{schedule.title}</p>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>
                            {new Date(schedule.startTime).toLocaleTimeString("ja-JP", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}{" "}
                            -
                            {new Date(schedule.endTime).toLocaleTimeString("ja-JP", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                          <span className="ml-2">({schedule.publisher})</span>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">スケジュールが見つかりませんでした。</p>
      )}
    </div>
  );
};

// メインのページコンポーネント
const SchedulePage = () => {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8">スケジュールを読み込み中...</div>}>
      <ScheduleContent />
    </Suspense>
  );
};

export default SchedulePage;
