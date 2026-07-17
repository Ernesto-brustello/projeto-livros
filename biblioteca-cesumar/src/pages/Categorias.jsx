import { useMemo, useState } from 'react'

const initialCategories = ['Ficção', 'Técnico', 'Infantil']

export default function Categorias() {
  const [categories, setCategories] = useState(initialCategories)
  const [draft, setDraft] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(initialCategories[0])

  const totalCategories = useMemo(() => categories.length, [categories])

  const summaryCards = [
    { title: 'Total de categorias', value: totalCategories },
    { title: 'Categoria selecionada', value: selectedCategory || 'Nenhuma' },
  ]

  const addCategory = (event) => {
    event.preventDefault()
    const nextValue = draft.trim()

    if (!nextValue) return

    const nextCategories = [...categories, nextValue]
    setCategories(nextCategories)
    setSelectedCategory(nextValue)
    setDraft('')
  }

  const removeCategory = (category) => {
    const nextCategories = categories.filter((item) => item !== category)
    setCategories(nextCategories)

    if (selectedCategory === category) {
      setSelectedCategory(nextCategories[0] || '')
    }
  }

  return (
    <div className="page-shell">
      <h1>Categorias</h1>
      <p>Gerencie as categorias de livros disponíveis no sistema.</p>

      <section className="hero-search">
        <div className="search-shell">
          <form onSubmit={addCategory} style={{ display: 'flex', gap: '0.75rem', width: '100%' }}>
            <input
              type="text"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Nova categoria"
              style={{ flex: 1 }}
            />
            <button className="button-secondary" type="submit">
              Adicionar
            </button>
          </form>
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

      <div className="cards-wrapper">
        {categories.map((category) => (
          <article key={category} className="book-card book-bar">
            <div className="book-body">
              <h2>{category}</h2>
              <div className="book-actions">
                <button className="button-secondary" type="button" onClick={() => setSelectedCategory(category)}>
                  Selecionar
                </button>
                <button className="button-tertiary" type="button" onClick={() => removeCategory(category)}>
                  Excluir
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
