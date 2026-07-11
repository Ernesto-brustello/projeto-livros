import { createContext, useContext, useEffect, useState } from 'react'
import * as bookService from '../services/bookService'

const BookContext = createContext()

export function BookProvider({ children }) {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    try {
      const storedBooks = bookService.loadBooks()
      setBooks(storedBooks)
    } catch (err) {
      console.error(err)
      setError('Não foi possível carregar os livros.')
    } finally {
      setLoading(false)
    }
  }, [])

  const saveBooks = (nextBooks) => {
    bookService.saveBooks(nextBooks)
    setBooks(nextBooks)
  }

  const addBook = (book) => {
    const nextBooks = bookService.addBook(books, book)
    saveBooks(nextBooks)
  }

  const updateBook = (book) => {
    const nextBooks = bookService.updateBook(books, book)
    saveBooks(nextBooks)
  }

  const deleteBook = (id) => {
    const nextBooks = bookService.deleteBook(books, id)
    saveBooks(nextBooks)
  }

  return (
    <BookContext.Provider value={{ books, loading, error, addBook, updateBook, deleteBook }}>
      {children}
    </BookContext.Provider>
  )
}

export function useBookContext() {
  const context = useContext(BookContext)
  if (!context) {
    throw new Error('useBookContext deve ser usado dentro de BookProvider')
  }
  return context
}
