import React from 'react';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold mb-4">AniHubへようこそ!</h1>
        <p className="text-xl mb-8">アニメに関するあらゆるものの究極の目的地。</p>
        <button className="bg-white text-blue-500 font-bold py-2 px-4 rounded hover:bg-blue-100 transition duration-300">
          探索を始める
        </button>
      </div>
    </section>
  );
};

export default HeroSection;