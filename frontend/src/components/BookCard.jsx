export default function BookCard({ book, onDetails, onEdit, onDelete }) {
  return (
    <article className="book-card">
      <div className="book-spine" />
      <div className="book-body">
        <div className="book-meta">
          <div className="book-icon">📖</div>
          <div>
            <h2>{book.title}</h2>
            <p className="book-author">{book.author}</p>
          </div>
        </div>
        <div className="book-details">
          <p>
            <strong>Ano:</strong> {book.year}
          </p>
          <p>
            <strong>ISBN:</strong> {book.isbn}
          </p>
        </div>
        <div className="book-actions">
          <button className="button-secondary" type="button" onClick={() => onDetails(book)}>
            Detalhes
          </button>
          <button className="button-secondary" type="button" onClick={() => onEdit(book)}>
            Editar
          </button>
          <button className="button-tertiary" type="button" onClick={() => onDelete(book.id)}>
            Excluir
          </button>
        </div>
      </div>
    </article>
  )
}
