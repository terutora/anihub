"use client";

import React, { useState, useEffect } from 'react';
import { TvIcon, CalendarIcon, Star } from 'lucide-react';
import { fetchAnimeList } from '@/lib/api-client';

const NewReleasesSection = () => {
  const [animeList, setAnimeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewReleases = async () => {
      try {
        setIsLoading(true);
        const data = await fetchAnimeList({ order: 'watchers_count', limit: 3 });
        setAnimeList(data);
      } catch (error) {
        console.error('Error fetching new releases:', error);
        setError('新作アニメの取得に失敗しました。後でもう一度お試しください。');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNewReleases();
  }, []);

  if (isLoading) {
    return <div className="text-center">読み込み中...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-center mb-8">新作を見る</h2>
      <p className="text-xl text-center text-gray-600 mb-12">最新のアニメのリリースやイベントを発見しよう。</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {animeList.map((anime) => (
          <div key={anime.id} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">{anime.title}</h3>
            <p className="text-gray-600 mb-4">{anime.synopsis.slice(0, 100)}...</p>
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 mr-1" />
              <span>{anime.watchers_count} watchers</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewReleasesSection;