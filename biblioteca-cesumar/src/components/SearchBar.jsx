export default function SearchBar({ value, onChange, onAdd }) {
  return (
    <section className="hero-search">
      <div className="search-shell">
        <div className="search-field">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Pesquisar livros por título, autor ou ISBN..."
            aria-label="Pesquisar livros"
            value={value}
            onChange={(event) => onChange(event.target.value)}
          />
        </div>
        <button className="button-primary" type="button" onClick={onAdd}>
          + Adicionar Livro
        </button>
      </div>
    </section>
  )
}
