const STORAGE_KEY = 'biblioteca-cesumar-books'

const initialBooks = [
  {
    id: 1,
    title: 'A Arte da Leitura',
    author: 'Marta Oliveira',
    year: '2023',
    isbn: '978-85-0000-001-1',
    category: 'Literatura',
    description: 'Uma coletânea de textos que celebra o hábito de ler e a descoberta de novas histórias.',
    coverUrl: '',
  },
  {
    id: 2,
    title: 'História da Ciência',
    author: 'Bruno Alves',
    year: '2021',
    isbn: '978-85-0000-002-8',
    category: 'Ciência',
    description: 'O desenvolvimento das ideias científicas desde a antiguidade até os dias atuais.',
    coverUrl: '',
  },
  {
    id: 3,
    title: 'Design Silencioso',
    author: 'Camila Reis',
    year: '2024',
    isbn: '978-85-0000-003-5',
    category: 'Design',
    description: 'Uma reflexão sobre como o design transforma ambientes, produtos e experiências.',
    coverUrl: '',
  },
  {
    id: 4,
    title: 'Gestão Acadêmica',
    author: 'Lucas Silva',
    year: '2022',
    isbn: '978-85-0000-004-2',
    category: 'Administração',
    description: 'Práticas e estratégias para administrar instituições de ensino e promover resultados eficientes.',
    coverUrl: '',
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
