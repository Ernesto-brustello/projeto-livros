import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBookContext } from '../contexts/BookContext'
import SearchBar from '../components/SearchBar'
import BookCard from '../components/BookCard'
import BookForm from '../components/BookForm'
import DeleteModal from '../components/DeleteModal'
import EmptyState from '../components/EmptyState'

export default function Livros() {
  const navigate = useNavigate()
  const { books, loading, processing, error, addBook, updateBook, deleteBook } = useBookContext()
  const [search, setSearch] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [editingBook, setEditingBook] = useState(null)

  const filteredBooks = useMemo(() => {
    if (!search.trim()) {
      return books
    }

    const normalizedTerm = search.toLowerCase().trim()
    return books.filter((book) =>
      [book.title, book.author, book.isbn].some((field) =>
        field.toLowerCase().includes(normalizedTerm),
      ),
    )
  }, [books, search])

  const openAddModal = () => {
    setEditingBook(null)
    setIsFormOpen(true)
  }

  const openEditModal = (book) => {
    setEditingBook(book)
    setIsFormOpen(true)
  }

  const openDetailsPage = (book) => {
    navigate(`/livros/${book.id}`)
  }

  const handleSaveBook = (book) => {
    if (editingBook) {
      updateBook({ ...editingBook, ...book })
    } else {
      addBook(book)
    }
    setIsFormOpen(false)
  }

  const handleDeleteRequest = (id) => {
    const book = books.find((item) => item.id === id)
    setDeleteTarget(book)
  }

  const confirmDelete = () => {
    if (deleteTarget) {
      deleteBook(deleteTarget.id)
      setDeleteTarget(null)
    }
  }

  const cancelDelete = () => {
    setDeleteTarget(null)
  }

  return (
    <div className="page-shell">
      <SearchBar value={search} onChange={setSearch} onAdd={openAddModal} />

      {loading && <p className="page-note">Carregando livros...</p>}
      {processing && <p className="page-note">Aplicando alterações...</p>}
      {error && <p className="field-error">{error}</p>}

      {!loading && filteredBooks.length === 0 && (
        <EmptyState
          title="Nenhum livro encontrado"
          description="Tente outro termo ou cadastre um novo livro para começar." 
        />
      )}

      <div className="cards-wrapper">
        {filteredBooks.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onDetails={openDetailsPage}
            onEdit={openEditModal}
            onDelete={handleDeleteRequest}
          />
        ))}
      </div>

      {isFormOpen && (
        <BookForm
          initialData={editingBook}
          onCancel={() => setIsFormOpen(false)}
          onSubmit={handleSaveBook}
        />
      )}

      {deleteTarget && (
        <DeleteModal book={deleteTarget} onCancel={cancelDelete} onConfirm={confirmDelete} />
      )}
    </div>
  )
}
