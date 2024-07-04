"use client";

import { Search } from 'lucide-react'

const SearchBar = () => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="お気に入りのアニメを検索"
        className="w-64 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
      <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
        <Search size={20} />
      </button>
    </div>
  )
}

export default SearchBar