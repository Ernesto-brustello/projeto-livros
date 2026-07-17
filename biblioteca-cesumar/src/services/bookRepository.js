import { initialBooks } from '../data/books.js'

const STORAGE_KEY = 'biblioteca-cesumar-books'

export function loadBooks() {
  const rawValue = localStorage.getItem(STORAGE_KEY)

  if (!rawValue) {
    return initialBooks
  }

  try {
    const storedBooks = JSON.parse(rawValue)
    return Array.isArray(storedBooks) ? storedBooks : initialBooks
  } catch (error) {
    console.error('Erro ao parsear livros do LocalStorage', error)
    return initialBooks
  }
}

export function saveBooks(books) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books))
}

export function addBook(currentBooks, book) {
  return [
    ...currentBooks,
    {
      id: Date.now(),
      available: true,
      ...book,
    },
  ]
}

export function updateBook(currentBooks, book) {
  return currentBooks.map((item) => (item.id === book.id ? book : item))
}

export function deleteBook(currentBooks, id) {
  return currentBooks.filter((item) => item.id !== id)
}
