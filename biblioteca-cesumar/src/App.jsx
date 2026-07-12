import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { BookProvider } from './contexts/BookContext'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Livros from './pages/Livros'
import Categorias from './pages/Categorias'
import Usuarios from './pages/Usuarios'
import Configuracoes from './pages/Configuracoes'
import './App.css'

function App() {
  return (
    <BookProvider>
      <BrowserRouter>
        <div className="app-shell">
          <main className="main-panel">
            <Header title="Biblioteca Cesumar" subtitle="Sistema de gerenciamento" />
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
