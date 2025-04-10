"use client";

import React from "react";
import { User, Calendar, Star, Settings } from "lucide-react";

const ProfilePage = () => {
  // 実際のアプリケーションでは、ここでユーザー情報を取得する処理が入ります
  const user = {
    name: "アニメファン",
    username: "anime_lover",
    joinDate: "2023年1月1日",
    watchedAnime: 128,
    favoriteGenres: ["ファンタジー", "アクション", "コメディ"],
  };

  // 視聴履歴のダミーデータ
  const watchHistory = [
    { id: 1, title: "ワンピース", episode: 1024, date: "2023-04-10" },
    { id: 2, title: "鬼滅の刃", episode: 26, date: "2023-04-08" },
    { id: 3, title: "呪術廻戦", episode: 12, date: "2023-04-05" },
  ];

  // お気に入りアニメのダミーデータ
  const favorites = [
    { id: 1, title: "進撃の巨人", rating: 5 },
    { id: 2, title: "ハイキュー!!", rating: 4 },
    { id: 3, title: "FullMetal Alchemist", rating: 5 },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {/* プロフィールヘッダー */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
          <div className="flex items-center">
            <div className="rounded-full bg-gray-200 p-4">
              <User size={64} className="text-gray-600" />
            </div>
            <div className="ml-6">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-blue-100">@{user.username}</p>
              <div className="flex items-center mt-2">
                <Calendar size={14} className="mr-1" />
                <span className="text-sm">登録日: {user.joinDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* プロフィールコンテンツ */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">視聴済みアニメ</h3>
              <p className="text-2xl font-bold text-blue-600">{user.watchedAnime}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">好きなジャンル</h3>
              <div className="flex flex-wrap gap-2">
                {user.favoriteGenres.map((genre, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {genre}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">設定</h3>
              <button className="flex items-center text-gray-600 hover:text-blue-500">
                <Settings size={16} className="mr-1" />
                <span>プロフィール設定</span>
              </button>
            </div>
          </div>

          {/* 視聴履歴 */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">最近の視聴履歴</h2>
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {watchHistory.map((item) => (
                  <li key={item.id} className="p-4 hover:bg-gray-100">
                    <a href={`/anime/${item.id}`} className="block">
                      <div className="flex justify-between">
                        <span className="font-medium">{item.title}</span>
                        <span className="text-gray-500 text-sm">{new Date(item.date).toLocaleDateString("ja-JP")}</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">エピソード {item.episode}</p>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* お気に入りアニメ */}
          <div>
            <h2 className="text-xl font-bold mb-4">お気に入りアニメ</h2>
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {favorites.map((anime) => (
                  <li key={anime.id} className="p-4 hover:bg-gray-100">
                    <a href={`/anime/${anime.id}`} className="block">
                      <div className="flex justify-between">
                        <span className="font-medium">{anime.title}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={16} className={i < anime.rating ? "text-yellow-400 fill-current" : "text-gray-300"} />
                          ))}
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
