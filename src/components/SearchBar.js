"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, X } from 'lucide-react';
import { searchAnime } from '@/lib/api-client';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const router = useRouter();
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        handleSearch();
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const data = await searchAnime(searchTerm);
      setResults(data.slice(0, 5)); // 最初の5件のみ表示
      setShowResults(true);
    } catch (error) {
      console.error('Search error:', error);
      setResults([{ id: 'error', title: '検索中にエラーが発生しました' }]);
      setShowResults(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
      setShowResults(false);
    }
  };

  return (
    <div ref={searchRef} className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          placeholder="アニメを検索..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-64 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={() => setSearchTerm('')}
            className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </button>
        )}
        <button
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500"
        >
          <Search size={20} />
        </button>
      </form>

      {showResults && (results.length > 0 || isLoading) && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
          {isLoading ? (
            <div className="p-2 text-center text-gray-500">検索中...</div>
          ) : (
            <ul>
              {results.map((anime) => (
                <li key={anime.id} className="border-b last:border-b-0">
                  <Link
                    href={`/anime/${anime.id}`}
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setShowResults(false)}
                  >
                    {anime.title}
                  </Link>
                </li>
              ))}
              <li className="border-t">
            <Link
              href={`/search?q=${encodeURIComponent(searchTerm)}`}
              className="block px-4 py-2 text-center text-blue-500 hover:bg-gray-100"
              onClick={() => setShowResults(false)}
            >
              すべての結果を見る
            </Link>
          </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;