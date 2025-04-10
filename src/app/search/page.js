"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { searchAnime } from "@/lib/api-client";

// クライアントコンポーネントを分離
const SearchResults = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;

      setIsLoading(true);
      try {
        const data = await searchAnime(query);
        setResults(data);
      } catch (err) {
        setError("検索結果の取得中にエラーが発生しました。");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  if (isLoading) return <div className="container mx-auto px-4 py-8">検索中...</div>;
  if (error) return <div className="container mx-auto px-4 py-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">「{query}」の検索結果</h1>
      {results.length === 0 ? (
        <p>検索結果が見つかりませんでした。</p>
      ) : (
        <ul className="space-y-4">
          {results.map((anime) => (
            <li key={anime.id} className="border-b pb-4">
              <Link href={`/anime/${anime.id}`} className="text-xl font-semibold hover:text-blue-500">
                {anime.title}
              </Link>
              <p className="text-gray-600">{anime.media_text}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// 必要なインポートを追加
import { useState, useEffect } from "react";

// メインのページコンポーネント
const SearchPage = () => {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8">検索データを読み込み中...</div>}>
      <SearchResults />
    </Suspense>
  );
};

export default SearchPage;
