"use client";

import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { fetchAnimeSchedule } from '@/lib/api-client';

const AnimeScheduleSection = () => {
  const [schedules, setSchedules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        setIsLoading(true);
        const data = await fetchAnimeSchedule();
        const groupedSchedules = groupSchedules(data);
        setSchedules(groupedSchedules);
      } catch (error) {
        console.error('Error fetching schedule:', error);
        setError('スケジュールの取得に失敗しました。後でもう一度お試しください。');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchedule();
    const intervalId = setInterval(fetchSchedule, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const groupSchedules = (data) => {
    const grouped = data.reduce((acc, curr) => {
      const key = `${curr.title}-${curr.endTime}`;
      if (!acc[key]) {
        acc[key] = { ...curr, publishers: [curr.publisher] };
      } else {
        acc[key].publishers.push(curr.publisher);
      }
      return acc;
    }, {});

    return Object.values(grouped).sort((a, b) => new Date(a.endTime) - new Date(b.endTime));
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-center mb-8">現在放送中のアニメ</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        {schedules.length > 0 ? (
          <ul className="space-y-4">
            {schedules.map((anime, index) => (
              <li key={index} className="flex items-center">
                <Clock className="w-5 h-5 text-blue-500 mr-3" />
                <span className="font-semibold mr-2">
                  {new Date(anime.endTime).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}まで
                </span>
                <span className="mr-2">{anime.title}</span>
                <span className="text-sm text-gray-500">
                  ({anime.publishers.join(', ')})
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">現在放送中のアニメはありません。</p>
        )}
      </div>
    </section>
  );
};

export default AnimeScheduleSection;