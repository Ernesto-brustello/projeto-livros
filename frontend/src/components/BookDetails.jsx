export default function BookDetails({ book, onClose }) {
  if (!book) {
    return null
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content details-modal">
        <div className="details-header">
          <div>
            <h2>{book.title}</h2>
            <p>{book.author}</p>
          </div>
          <button className="button-tertiary" type="button" onClick={onClose}>
            Fechar
          </button>
        </div>
        <div className="details-body">
          <div className="details-cover">
            {book.coverUrl ? (
              <img src={book.coverUrl} alt={`Capa de ${book.title}`} />
            ) : (
              <div className="details-cover-placeholder">Sem imagem</div>
            )}
          </div>
          <div className="details-info">
            <p>
              <strong>ISBN:</strong> {book.isbn}
            </p>
            <p>
              <strong>Ano:</strong> {book.year}
            </p>
            <p>
              <strong>Categoria:</strong> {book.category}
            </p>
            <p>
              <strong>Descrição:</strong>
            </p>
            <p>{book.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
