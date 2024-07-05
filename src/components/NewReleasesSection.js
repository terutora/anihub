"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Slider from "react-slick";
import { Star } from 'lucide-react';
import PropTypes from 'prop-types';
import { fetchAnnictData } from '@/lib/api-client';

const getImageUrl = (anime) => {
  if (anime.images?.recommended_url) return anime.images.recommended_url;
  if (anime.images?.facebook?.og_image_url) return anime.images.facebook.og_image_url;
  if (anime.image?.original_url) return anime.image.original_url;
  return null;
};

const AnimeCard = React.memo(({ anime, isPriority }) => {
  const [imageError, setImageError] = useState(false);
  const imageUrl = useMemo(() => getImageUrl(anime), [anime]);

  return (
    <Link href={`/anime/${anime.id}`}>
      <div className="px-2">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="relative h-64">
            {imageUrl && !imageError ? (
              <Image
                src={imageUrl}
                alt={anime.title}
                fill
                sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
                style={{ objectFit: 'cover' }}
                onError={() => setImageError(true)}
                priority={isPriority}
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">{anime.title}</span>
              </div>
            )}
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2 truncate">{anime.title}</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 mr-1" />
                <span>{anime.watchers_count} watchers</span>
              </div>
              <span className="text-sm text-gray-500">{anime.media_text}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
});

AnimeCard.displayName = 'AnimeCard';

AnimeCard.propTypes = {
  anime: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    watchers_count: PropTypes.number.isRequired,
    media_text: PropTypes.string.isRequired,
    images: PropTypes.object,
    image: PropTypes.object,
  }).isRequired,
  isPriority: PropTypes.bool,
};

const NewReleasesSection = () => {
  const [animeList, setAnimeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        setIsLoading(true);
        const data = await fetchAnnictData();
        setAnimeList(data.slice(0, 10));
      } catch (error) {
        console.error('Error fetching current season anime:', error);
        setError('今期アニメの取得に失敗しました。後でもう一度お試しください。');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnime();
  }, []);

  const settings = useMemo(() => ({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }), []);

  if (isLoading) return <div className="text-center py-12">Loading...</div>;
  if (error) return <div className="text-center py-12 text-red-500">{error}</div>;

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-center mb-8">今期の注目アニメ</h2>
      <p className="text-xl text-center text-gray-600 mb-12">今季放送中の人気アニメをチェックしよう。</p>
      <Slider {...settings}>
        {animeList.map((anime, index) => (
          <AnimeCard key={anime.id} anime={anime} isPriority={index === 0} />
        ))}
      </Slider>
    </section>
  );
};

export default NewReleasesSection;