export default function DeleteModal({ book, onCancel, onConfirm }) {
  if (!book) {
    return null
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Excluir livro</h2>
        <p>Tem certeza que deseja excluir este livro?</p>
        <p>
          <strong>{book.title}</strong> — {book.author}
        </p>
        <div className="modal-actions">
          <button className="button-tertiary" type="button" onClick={onCancel}>
            Cancelar
          </button>
          <button className="button-secondary" type="button" onClick={onConfirm}>
            Excluir
          </button>
        </div>
      </div>
    </div>
  )
}
