import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { BookProvider } from './contexts/BookContext'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Livros from './pages/Livros'
import Categorias from './pages/Categorias'
import Usuarios from './pages/Usuarios'
import Configuracoes from './pages/Configuracoes'
import './App.css'

const THEME_KEY = 'biblioteca-cesumar-theme'

function App() {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_KEY)
    setTheme(savedTheme === 'dark' ? 'dark' : 'light')
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }

  return (
    <BookProvider>
      <BrowserRouter>
        <div className="app-shell">
          <Sidebar />
          <main className="main-panel">
            <Header title="Biblioteca Cesumar" subtitle="Sistema de gerenciamento" theme={theme} onToggleTheme={toggleTheme} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/livros" element={<Livros />} />
              <Route path="/categorias" element={<Categorias />} />
              <Route path="/usuarios" element={<Usuarios />} />
              <Route path="/configuracoes" element={<Configuracoes />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </BookProvider>
  )
}

export default App
