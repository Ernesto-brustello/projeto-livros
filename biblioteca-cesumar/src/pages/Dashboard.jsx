import { useEffect, useMemo, useState } from 'react'
import { useBookContext } from '../contexts/BookContext'

export default function Dashboard() {
  const { books } = useBookContext()
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  const stats = useMemo(() => {
    const categories = [...new Set(books.map((book) => book.category).filter(Boolean))]
    const recentBooks = [...books]
      .sort((first, second) => Number(second.year || 0) - Number(first.year || 0))
      .slice(0, 3)

    return {
      totalBooks: books.length,
      totalCategories: categories.length,
      recentBooks,
    }
  }, [books])

  const summaryCards = [
    { title: 'Total de livros', value: stats.totalBooks },
    { title: 'Categorias', value: stats.totalCategories },
    {
      title: 'Últimos lançamentos',
      value:
        stats.recentBooks.length > 0
          ? stats.recentBooks.map((book) => book.title).join(', ')
          : 'Ainda não há livros cadastrados.',
    },
  ]

  return (
    <div className="page-shell">
      <section className="hero-search">
        <div className="search-shell">
          <div>
            <h1>Dashboard</h1>
            <p>Bem-vindo(a) ao painel principal da Biblioteca Cesumar.</p>
          </div>
          <div className="page-subtitle">{now.toLocaleString('pt-BR')}</div>
        </div>
      </section>

      <div className="cards-wrapper">
        {summaryCards.map((card) => (
          <article key={card.title} className="book-card book-bar">
            <div className="book-body">
              <h2>{card.title}</h2>
              <p className="book-author">{card.value}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
