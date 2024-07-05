"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Clock, Tv, RefreshCw } from 'lucide-react';
import { fetchSyobocalData } from '@/lib/api-client';

const AnimeScheduleSection = () => {
  const [schedules, setSchedules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const groupSchedules = useCallback((data) => {
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
  }, []);

  const fetchSchedule = useCallback(async () => {
    try {
      setIsRefreshing(true);
      const data = await fetchSyobocalData();
      const groupedSchedules = groupSchedules(data);
      setSchedules(groupedSchedules);
      setLastUpdated(new Date());
      setError(null);
    } catch (error) {
      console.error('Error fetching schedule:', error);
      setError('スケジュールの取得に失敗しました。後でもう一度お試しください。');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [groupSchedules]);

  useEffect(() => {
    fetchSchedule();
  }, [fetchSchedule]);

  const handleRefresh = () => {
    fetchSchedule();
  };

  if (isLoading) return <div className="text-center py-12">Loading...</div>;
  if (error) return <div className="text-center py-12 text-red-500">{error}</div>;

  return (
    <section className="py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">現在放送中のアニメ</h2>
        <div className="flex items-center">
          {lastUpdated && (
            <span className="text-sm text-gray-500 mr-4">
              最終更新: {lastUpdated.toLocaleTimeString('ja-JP')}
            </span>
          )}
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className={`flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors ${
              isRefreshing ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            更新
          </button>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        {schedules.length > 0 ? (
          <ul className="space-y-4">
            {schedules.map((anime, index) => (
              <li key={index} className="flex items-center">
                <Tv className="w-5 h-5 text-blue-500 mr-3" />
                <span className="font-semibold mr-2">{anime.title}</span>
                <Clock className="w-4 h-4 text-gray-400 mr-1" />
                <span className="text-sm text-gray-500 mr-2">
                  {new Date(anime.endTime).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}まで
                </span>
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