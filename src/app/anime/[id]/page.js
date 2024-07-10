'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { isValidImageUrl } from '@/utils/imageValidation';
import { fetchAnimeDetail, fetchAnimeCasts } from '@/lib/annict-client';
import { Calendar, Clock, ExternalLink, BookOpen, Hash } from 'lucide-react';

const AnimeDetailPage = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [casts, setCasts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const animeData = await fetchAnimeDetail(id);
        setAnime(animeData);
        console.log('取得したアニメデータ:', animeData);

        try {
          const castsData = await fetchAnimeCasts(id);
          setCasts(castsData);
          console.log('取得したキャストデータ:', castsData);
        } catch (castError) {
          console.error('キャスト情報の取得エラー:', castError);
        }
      } catch (error) {
        console.error('アニメデータの取得エラー:', error);
        setError(error.response?.data?.errors?.[0]?.message || error.message || 'データの取得中にエラーが発生しました');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) return <div className="flex justify-center items-center h-screen text-black">読み込み中...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">エラー: {error}</div>;
  if (!anime) return <div className="flex justify-center items-center h-screen text-black">アニメデータが見つかりません</div>;

  return (
    <div className="container mx-auto px-4 py-8 bg-white min-h-screen text-black">
      <div className="bg-gray-100 shadow-xl rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            {anime.images?.facebook?.og_image_url && isValidImageUrl(anime.images.facebook.og_image_url) ? (
              <Image
                src={anime.images.facebook.og_image_url}
                alt={anime.title}
                width={400}
                height={600}
                className="w-full h-auto md:w-96 object-cover"
                priority
              />
            ) : (
              <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">画像がありません</span>
              </div>
            )}
          </div>
          <div className="p-8 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-4 text-black">{anime.title}</h1>
              <p className="text-gray-600 mb-6">{anime.media_text}</p>
              <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-gray-600" />
                  <span><strong>シーズン:</strong> {anime.season_name_text}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-gray-600" />
                  <span><strong>エピソード数:</strong> {anime.episodes_count}</span>
                </div>
                {anime.twitter_hashtag && (
                  <div className="flex items-center col-span-2">
                    <Hash className="w-5 h-5 mr-2 text-gray-600" />
                    <span><strong>ハッシュタグ:</strong> #{anime.twitter_hashtag}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex space-x-4">
              {anime.official_site_url && (
                <a
                  href={anime.official_site_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-black bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  公式サイト
                </a>
              )}
              {anime.wikipedia_url && (
                <a
                  href={anime.wikipedia_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-black bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Wikipedia
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {casts && casts.length > 0 && (
        <div className="mt-12 bg-gray-100 shadow-xl rounded-lg overflow-hidden p-8">
          <h2 className="text-2xl font-bold mb-6 text-black">キャスト</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {casts.map((cast) => (
              <div key={cast.id} className="bg-white p-4 rounded-lg shadow">
                <p className="font-semibold text-lg text-black">{cast.character?.name || '不明なキャラクター'}</p>
                <p className="text-gray-600">{cast.person?.name || cast.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimeDetailPage;