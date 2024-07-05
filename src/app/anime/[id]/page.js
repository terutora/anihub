'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Star, Calendar, Clock, Tv, Users, BarChart } from 'lucide-react';

const AnimeDetailPage = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnimeDetail = async () => {
      console.log('Fetching anime detail for id:', id);
      try {
        setIsLoading(true);
        const response = await fetch(`/api/annict/anime/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch anime details');
        }
        const data = await response.json();
        console.log('Fetched anime data:', data);
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

  if (isLoading) return <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
  </div>;
  if (error) return <div className="text-center py-12 text-red-500">{error}</div>;
  if (!anime) return <div className="text-center py-12">アニメが見つかりません。</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img className="h-64 w-full object-cover md:w-64" src={anime.images?.recommended_url || '/placeholder-image.jpg'} alt={anime.title} />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{anime.media_text}</div>
            <h1 className="mt-1 text-4xl font-bold text-gray-900">{anime.title}</h1>
            
            <div className="mt-4 flex flex-wrap">
              <div className="mr-4 mb-2">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <span className="ml-1 font-semibold">{anime.rating_average?.toFixed(1) || 'N/A'}</span>
                </div>
                <div className="text-sm text-gray-500">Rating</div>
              </div>
              
              <div className="mr-4 mb-2">
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-blue-400" />
                  <span className="ml-1 font-semibold">{anime.watchers_count}</span>
                </div>
                <div className="text-sm text-gray-500">Watchers</div>
              </div>
              
              <div className="mr-4 mb-2">
                <div className="flex items-center">
                  <BarChart className="h-5 w-5 text-green-400" />
                  <span className="ml-1 font-semibold">{anime.episodes_count}</span>
                </div>
                <div className="text-sm text-gray-500">Episodes</div>
              </div>
            </div>

            <div className="mt-4">
              <h2 className="text-xl font-semibold text-gray-900">Synopsis</h2>
              <p className="mt-2 text-gray-600">{anime.synopsis}</p>
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center text-gray-700">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>{anime.season_name_text}</span>
                </div>
              </div>
              
              <div>
                <div className="flex items-center text-gray-700">
                  <Tv className="h-5 w-5 mr-2" />
                  <span>{anime.broadcast_text || 'Broadcast information not available'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetailPage;