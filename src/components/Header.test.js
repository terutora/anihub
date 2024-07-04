import { render, screen } from '@testing-library/react'
import Header from './Header'

jest.mock('lucide-react', () => ({
    Search: () => 'Search Icon',
    Home: () => 'Home Icon',
    Calendar: () => 'Calendar Icon',
    Users: () => 'Users Icon',
    User: () => 'User Icon',
    Clock: () => 'Clock Icon',
    Star: () => 'Star Icon',
    // 他に使用しているアイコンがあれば、ここに追加してください
  }))
  
describe('Header', () => {
  it('renders the logo', () => {
    render(<Header />)
    const logo = screen.getByText('AniHub')
    expect(logo).toBeInTheDocument()
  })

  it('renders navigation items', () => {
    render(<Header />)
    const homeLink = screen.getByText('ホーム')
    const animeListLink = screen.getByText('アニメ一覧')
    const communityLink = screen.getByText('コミュニティ')
    const profileLink = screen.getByText('マイページ')

    expect(homeLink).toBeInTheDocument()
    expect(animeListLink).toBeInTheDocument()
    expect(communityLink).toBeInTheDocument()
    expect(profileLink).toBeInTheDocument()
  })
})