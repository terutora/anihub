import { render, screen, waitFor } from '@testing-library/react'
import NewReleasesSection from './NewReleasesSection'

// APIのモックを作成
jest.mock('../lib/api-client', () => ({
  fetchAnimeList: jest.fn(() => Promise.resolve([
    { id: 1, title: 'New Anime 1', synopsis: 'Synopsis 1', watchers_count: 1000 },
    { id: 2, title: 'New Anime 2', synopsis: 'Synopsis 2', watchers_count: 2000 },
  ]))
}))

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

describe('NewReleasesSection', () => {
  it('renders the section title', async () => {
    render(<NewReleasesSection />)
    expect(screen.getByText('新作を見る')).toBeInTheDocument()
  })

  it('displays loading state initially', () => {
    render(<NewReleasesSection />)
    expect(screen.getByText('読み込み中...')).toBeInTheDocument()
  })

  it('renders new anime releases after loading', async () => {
    render(<NewReleasesSection />)
    
    await waitFor(() => {
      expect(screen.getByText('New Anime 1')).toBeInTheDocument()
      expect(screen.getByText('New Anime 2')).toBeInTheDocument()
    })
  })
})