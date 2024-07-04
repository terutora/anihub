'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Star, Calendar, Clock, Tv } from 'lucide-react';

const AnimeDetailPage = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnimeDetail = async () => {
      try {
        setIsLoading(true);
        // ここでAnnictのAPIを呼び出してアニメの詳細情報を取得します
        // 実際のAPIエンドポイントとクライアントの実装に合わせて調整してください
        const response = await fetch(`/api/annict/anime/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch anime details');
        }
        const data = await response.json();
        setAnime(data);
      } catch (error) {
        console.error('Error fetching anime details:', error);
        setError('アニメ情報の取得に失敗しました。後でもう一度お試しください。');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnimeDetail();
  }, [id]);

  if (isLoading) return <div className="text-center py-12">Loading...</div>;
  if (error) return <div className="text-center py-12 text-red-500">{error}</div>;
  if (!anime) return <div className="text-center py-12">アニメが見つかりません。</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img className="h-48 w-full object-cover md:w-48" src={anime.image?.original_url || '/placeholder-image.jpg'} alt={anime.title} />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{anime.media_text}</div>
            <h1 className="mt-1 text-4xl font-bold text-gray-900">{anime.title}</h1>
            <p className="mt-2 text-gray-600">{anime.synopsis}</p>
            
            <div className="mt-4 flex items-center">
              <Star className="h-5 w-5 text-yellow-400" />
              <span className="ml-1">{anime.rating_average?.toFixed(1) || 'N/A'} ({anime.watchers_count} watchers)</span>
            </div>
            
            <div className="mt-2 flex items-center">
              <Calendar className="h-5 w-5 text-gray-400" />
              <span className="ml-1">{anime.season_name_text}</span>
            </div>
            
            <div className="mt-2 flex items-center">
              <Clock className="h-5 w-5 text-gray-400" />
              <span className="ml-1">{anime.episodes_count} episodes</span>
            </div>
            
            <div className="mt-2 flex items-center">
              <Tv className="h-5 w-5 text-gray-400" />
              <span className="ml-1">{anime.broadcast_text || 'Broadcast information not available'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetailPage;