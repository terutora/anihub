import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const AnimeScheduleSection = () => {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const fetchSchedule = async () => {
      const now = new Date();
      const end = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24時間後

      try {
        const response = await fetch(`/api/schedule?start=${now.toISOString()}&end=${end.toISOString()}`);
        if (!response.ok) {
          throw new Error('Failed to fetch schedule');
        }
        const data = await response.json();
        setSchedules(data);
      } catch (error) {
        console.error('Error fetching schedule:', error);
        // エラー処理をここに追加（例: ユーザーへの通知）
      }
    };

    fetchSchedule();
  }, []);

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">今後のアニメスケジュール</h2>
        <p className="text-xl text-center text-gray-600 mb-12">
          今後のエピソードを見逃さないようにしよう。
        </p>
        <div className="card p-6">
          {schedules.length > 0 ? (
            <ul className="space-y-4">
              {schedules.map((anime, index) => (
                <li key={index} className="flex items-center">
                  <Clock className="w-5 h-5 text-blue-500 mr-3" />
                  <span className="font-semibold mr-2">
                    {new Date(anime.time).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <span className="text-gray-700">{anime.title}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500">現在予定されているアニメはありません。</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default AnimeScheduleSection;