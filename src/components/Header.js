"use client";

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Home, Calendar, Users, User } from 'lucide-react'
import SearchBar from './SearchBar'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const navItems = [
    { name: 'ホーム', href: '/', icon: Home },
    { name: 'アニメ一覧', href: '/anime', icon: Calendar },
    { name: 'コミュニティ', href: '/community', icon: Users },
    { name: 'マイページ', href: '/profile', icon: User },
  ]

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">AniHub</Link>
          <div className="hidden md:block">
            <SearchBar />
          </div>
          <nav className="hidden md:block">
            <ul className="flex space-x-4">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="flex items-center text-gray-600 hover:text-blue-500">
                    <item.icon className="w-5 h-5 mr-1" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {/* モバイルメニュー */}
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="px-4 pt-2 pb-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="flex items-center text-gray-600 hover:text-blue-500" onClick={toggleMenu}>
                    <item.icon className="w-5 h-5 mr-2" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="px-4 pb-4">
            <SearchBar />
          </div>
        </div>
      )}
    </header>
  )
}

export default Header