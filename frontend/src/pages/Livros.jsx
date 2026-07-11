import { useMemo, useState } from 'react'
import { useBookContext } from '../contexts/BookContext'
import Header from '../components/Header'
import SearchBar from '../components/SearchBar'
import BookCard from '../components/BookCard'
import BookForm from '../components/BookForm'
import BookDetails from '../components/BookDetails'
import DeleteModal from '../components/DeleteModal'

export default function Livros() {
  const { books, loading, error, addBook, updateBook, deleteBook } = useBookContext()
  const [search, setSearch] = useState('')
  const [selectedBook, setSelectedBook] = useState(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
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

  const openDetailsModal = (book) => {
    setSelectedBook(book)
    setIsDetailsOpen(true)
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
    deleteBook(deleteTarget.id)
    setDeleteTarget(null)
  }

  const cancelDelete = () => {
    setDeleteTarget(null)
  }

  return (
    <div className="page-shell">
      <SearchBar value={search} onChange={setSearch} onAdd={openAddModal} />

      {loading && <p>Carregando livros...</p>}
      {error && <p className="field-error">{error}</p>}

      {!loading && filteredBooks.length === 0 && (
        <p>Nenhum livro encontrado.</p>
      )}

      <div className="cards-wrapper">
        {filteredBooks.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onDetails={openDetailsModal}
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

      {isDetailsOpen && (
        <BookDetails
          book={selectedBook}
          onClose={() => setIsDetailsOpen(false)}
        />
      )}

      {deleteTarget && (
        <DeleteModal book={deleteTarget} onCancel={cancelDelete} onConfirm={confirmDelete} />
      )}
    </div>
  )
}
