import { createContext, useContext, useEffect, useState } from 'react'
import * as bookRequests from '../services/bookRequests.js'

const BookContext = createContext(null)

export function BookProvider({ children }) {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    const loadBooks = async () => {
      try {
        const storedBooks = await bookRequests.fetchBooks()
        if (isMounted) {
          setBooks(storedBooks)
        }
      } catch (err) {
        console.error(err)
        if (isMounted) {
          setError('Não foi possível carregar os livros.')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadBooks()

    return () => {
      isMounted = false
    }
  }, [])

  const handleRequest = async (request) => {
    setProcessing(true)

    try {
      const nextBooks = await request()
      setBooks(nextBooks)
    } catch (err) {
      console.error(err)
      setError('Não foi possível atualizar os livros.')
    } finally {
      setProcessing(false)
    }
  }

  const addBook = (book) => handleRequest(() => bookRequests.createBook(book))
  const updateBook = (book) => handleRequest(() => bookRequests.editBook(book))
  const deleteBook = (id) => handleRequest(() => bookRequests.removeBook(id))

  return (
    <BookContext.Provider
      value={{ books, loading, processing, error, addBook, updateBook, deleteBook }}
    >
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
