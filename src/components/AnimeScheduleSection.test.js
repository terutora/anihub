import { render, screen, waitFor } from '@testing-library/react'
import AnimeScheduleSection from './AnimeScheduleSection'

// APIのモックを作成
jest.mock('../lib/api-client', () => ({
  fetchAnimeSchedule: jest.fn(() => Promise.resolve([
    { id: 1, title: 'Anime 1', time: new Date('2024-07-04T20:00:00') },
    { id: 2, title: 'Anime 2', time: new Date('2024-07-04T21:00:00') },
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

describe('AnimeScheduleSection', () => {
  it('renders the schedule section title', async () => {
    render(<AnimeScheduleSection />)
    expect(screen.getByText('今後のアニメスケジュール')).toBeInTheDocument()
  })

  it('displays loading state initially', () => {
    render(<AnimeScheduleSection />)
    expect(screen.getByText('読み込み中...')).toBeInTheDocument()
  })

  it('renders anime schedules after loading', async () => {
    render(<AnimeScheduleSection />)
    
    await waitFor(() => {
      expect(screen.getByText('Anime 1')).toBeInTheDocument()
      expect(screen.getByText('Anime 2')).toBeInTheDocument()
    })
  })
})