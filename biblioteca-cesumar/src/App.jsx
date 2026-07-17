import { useEffect, useMemo, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { BookProvider } from './contexts/BookContext'
import LoadingScreen from './components/LoadingScreen'
import MainLayout from './layouts/MainLayout'
import Dashboard from './pages/Dashboard'
import Livros from './pages/Livros'
import BookDetailsPage from './pages/BookDetailsPage'
import Categorias from './pages/Categorias'
import Usuarios from './pages/Usuarios'
import Configuracoes from './pages/Configuracoes'
import PageNotFound from './pages/PageNotFound'
import './App.css'

function App() {
  const [loading, setLoading] = useState(true)
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 4000)

    return () => clearTimeout(timer)
  }, [])

  const subtitle = useMemo(
    () => (theme === 'dark' ? 'Tema escuro ativo' : 'Sistema de gerenciamento'),
    [theme],
  )

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <BookProvider>
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <MainLayout
                theme={theme}
                onToggleTheme={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
                subtitle={subtitle}
              />
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="livros" element={<Livros />} />
            <Route path="livros/:id" element={<BookDetailsPage />} />
            <Route path="categorias" element={<Categorias />} />
            <Route path="usuarios" element={<Usuarios />} />
            <Route path="configuracoes" element={<Configuracoes />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </BookProvider>
  )
}

export default App