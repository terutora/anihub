'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { isValidImageUrl } from '@/utils/imageValidation';

const AnimeDetailPage = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnimeDetail = async () => {
      console.log('Client: Fetching anime detail for id:', id);
      try {
        setIsLoading(true);
        const response = await fetch(`/api/annict/anime/${id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || `HTTP error! status: ${response.status}`);
        }

        console.log('Client: Fetched anime data:', data);
        setAnime(data);
      } catch (error) {
        console.error('Client: Error fetching anime details:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnimeDetail();
  }, [id]);

  if (isLoading) return <div className="container mx-auto px-4 py-8 text-center">Loading...</div>;
  if (error) return <div className="container mx-auto px-4 py-8 text-center text-red-500">Error: {error}</div>;
  if (!anime) return <div className="container mx-auto px-4 py-8 text-center">No anime data found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 p-4">
            {anime.imageUrl && isValidImageUrl(anime.imageUrl) ? (
              <Image
                src={anime.imageUrl}
                alt={anime.title}
                width={400}
                height={600}
                className="w-full h-auto object-cover rounded-lg"
                priority={true}
                loading="eager"
              />
            ) : (
              <div className="w-full h-96 bg-gray-200 flex items-center justify-center rounded-lg">
                <span className="text-gray-500">No Image Available</span>
              </div>
            )}
          </div>
          <div className="md:w-2/3 p-8">
            <h1 className="text-3xl font-bold mb-4">{anime.title}</h1>
            <p className="text-xl text-gray-600 mb-6">{anime.media_text}</p>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div>
                <strong className="text-gray-700">Season:</strong> {anime.season_name_text}
              </div>
              <div>
                <strong className="text-gray-700">Episodes:</strong> {anime.episodes_count}
              </div>
              <div>
                <strong className="text-gray-700">Watchers:</strong> {anime.watchers_count}
              </div>
              <div>
                <strong className="text-gray-700">Rating:</strong> {anime.rating_average ? anime.rating_average.toFixed(1) : 'N/A'}
              </div>
            </div>
            <h2 className="text-2xl font-semibold mb-4">Synopsis</h2>
            <p className="text-gray-700 leading-relaxed">{anime.synopsis}</p>
          </div>
        </div>
      </div>
      {anime.otherImages && anime.otherImages.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Additional Images</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {anime.otherImages.map((imgUrl, index) => (
              <Image
                key={index}
                src={imgUrl}
                alt={`Additional image ${index + 1}`}
                width={200}
                height={200}
                className="w-full h-auto object-cover rounded-lg"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimeDetailPage;