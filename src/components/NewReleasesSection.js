import React from 'react';
import { TvIcon, CalendarIcon, Star } from 'lucide-react';

const Card = ({ title, description, icon: Icon }) => (
    <div className="card p-6">
      <div className="flex items-center mb-4">
        <Icon className="w-8 h-8 text-blue-500 mr-3" />
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
);

const NewReleasesSection = () => {
    return (
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">新作を見る</h2>
            <p className="text-xl text-center text-gray-600 mb-12">最新のアニメのリリースやイベントを発見しよう。</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card 
          title="New エピソード" 
          description="最新のエピソードをご覧ください。" 
          icon={TvIcon}
        />
        <Card 
          title="今後のリリース" 
          description="次のアニメシリーズの最新情報を入手できます。" 
          icon={Star}
        />
        <Card 
          title="イベントカレンダー" 
          description="アニメ関連のイベントを確認できます。" 
          icon={CalendarIcon}
        />
        </div>
      </div>
    </section>
  );
};

export default NewReleasesSection;