const STORAGE_KEY = 'biblioteca-cesumar-books'

const initialBooks = [
  {
    id: 1,
    title: 'One Piece',
    author: 'Eiichiro Oda',
    year: '1999',
    isbn: '482-73-1906-214-8',
    category: 'Mangá',
    description: 'Ano de estreia: 1999. Autor: Eiichiro Oda.',
    coverUrl: '/book-cover.svg',
  },
  {
    id: 2,
    title: 'Naruto e Naruto Shippuden',
    author: 'Masashi Kishimoto',
    year: '2002',
    isbn: '105-86-4327-958-1',
    category: 'Mangá',
    description: 'Ano de estreia: 2002. Autor: Masashi Kishimoto.',
    coverUrl: '/book-cover.svg',
  },
  {
    id: 3,
    title: 'Attack on Titan',
    author: 'Hajime Isayama',
    year: '2013',
    isbn: '793-41-2680-537-6',
    category: 'Mangá',
    description: 'Ano de estreia: 2013. Autor: Hajime Isayama.',
    coverUrl: '/book-cover.svg',
  },
  {
    id: 4,
    title: 'Dragon Ball / Dragon Ball Z / Super',
    author: 'Akira Toriyama',
    year: '1986',
    isbn: '256-98-0143-672-4',
    category: 'Mangá',
    description: 'Ano de estreia (Original): 1986. Autor: Akira Toriyama.',
    coverUrl: '/book-cover.svg',
  },
  {
    id: 5,
    title: 'Demon Slayer',
    author: 'Koyoharu Gotouge',
    year: '2019',
    isbn: '834-12-7509-385-9',
    category: 'Mangá',
    description: 'Ano de estreia: 2019. Autora: Koyoharu Gotouge.',
    coverUrl: '/book-cover.svg',
  },
  {
    id: 6,
    title: 'Fullmetal Alchemist: Brotherhood',
    author: 'Hiromu Arakawa',
    year: '2009',
    isbn: '671-30-5482-146-2',
    category: 'Mangá',
    description: 'Ano de estreia: 2009. Autora: Hiromu Arakawa.',
    coverUrl: '/book-cover.svg',
  },
]

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
