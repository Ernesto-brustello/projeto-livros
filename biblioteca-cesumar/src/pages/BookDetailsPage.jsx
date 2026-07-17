import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useBookContext } from '../contexts/BookContext'

export default function BookDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { books } = useBookContext()

  const book = useMemo(
    () => books.find((item) => String(item.id) === String(id)),
    [books, id],
  )

  if (!book) {
    return (
      <div className="page-shell page-transition visible">
        <h1>Livro não encontrado</h1>
        <p>Verifique se o livro ainda existe ou volte para a lista.</p>
      </div>
    )
  }

  return (
    <div className="page-shell page-transition visible">
      <section className="section-header">
        <div>
          <h1>{book.title}</h1>
          <p>{book.author}</p>
        </div>
        <div className="book-actions">
          <button className="button-secondary" type="button" onClick={() => navigate(-1)}>
            Voltar
          </button>
          <button className="button-tertiary" type="button" onClick={() => navigate('/livros')}>
            Editar
          </button>
        </div>
      </section>

      <div className="details-modal details-body">
        <div className="details-cover">
          {book.coverUrl ? (
            <img src={book.coverUrl} alt={`Capa de ${book.title}`} />
          ) : (
            <div className="details-cover-placeholder">Sem imagem</div>
          )}
        </div>
        <div className="details-info">
          <p>
            <strong>Autor:</strong> {book.author}
          </p>
          <p>
            <strong>Categoria:</strong> {book.category}
          </p>
          <p>
            <strong>Editora:</strong> {book.publisher}
          </p>
          <p>
            <strong>Ano:</strong> {book.year}
          </p>
          <p>
            <strong>ISBN:</strong> {book.isbn}
          </p>
          <p>
            <strong>Páginas:</strong> {book.pages}
          </p>
          <p>
            <strong>Status:</strong> {book.available ? 'Disponível' : 'Indisponível'}
          </p>
          <div>
            <strong>Descrição:</strong>
            <p>{book.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
