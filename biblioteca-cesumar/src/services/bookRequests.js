import * as repository from './bookRepository.js'

const simulateDelay = (result, delay = 160) =>
  new Promise((resolve) => {
    window.setTimeout(() => resolve(result), delay)
  })

export async function fetchBooks() {
  return simulateDelay(repository.loadBooks())
}

export async function createBook(book) {
  const currentBooks = repository.loadBooks()
  const nextBooks = repository.addBook(currentBooks, book)
  repository.saveBooks(nextBooks)
  return simulateDelay(nextBooks)
}

export async function editBook(book) {
  const currentBooks = repository.loadBooks()
  const nextBooks = repository.updateBook(currentBooks, book)
  repository.saveBooks(nextBooks)
  return simulateDelay(nextBooks)
}

export async function removeBook(id) {
  const currentBooks = repository.loadBooks()
  const nextBooks = repository.deleteBook(currentBooks, id)
  repository.saveBooks(nextBooks)
  return simulateDelay(nextBooks)
}
