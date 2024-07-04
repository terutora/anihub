import React from 'react';
import { Star, User } from 'lucide-react';

const ReviewCard = ({ username, content, rating }) => (
    <div className="card p-6">
    <div className="flex items-center mb-4">
      <User className="w-6 h-6 text-gray-500 mr-2" />
      <span className="font-semibold">{username}</span>
    </div>
    <p className="text-gray-600 mb-4">{content}</p>
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${
            i < rating ? 'text-yellow-400' : 'text-gray-300'
          }`}
          fill={i < rating ? 'currentColor' : 'none'}
        />
      ))}
    </div>
  </div>
);

const UserReviewsSection = () => {
  const reviews = [
    { username: 'AnimeFan123', content: 'Amazing storyline and characters!', rating: 5 },
    { username: 'OtakuGirl22', content: 'Incredible animation quality.', rating: 4 },
    { username: 'MangaLover', content: 'Great adaptation from the manga!', rating: 5 },
  ];

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-center mb-8">ユーザーレビュー</h2>
      <p className="text-xl text-center text-gray-600 mb-12">
        他の人が好きなアニメについて何と言っているか見てみましょう。
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reviews.map((review, index) => (
          <ReviewCard key={index} {...review} />
        ))}
      </div>
    </section>
  );
};

export default UserReviewsSection;