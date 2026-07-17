import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Breadcrumbs from '../components/Breadcrumbs'

export default function MainLayout({ theme, onToggleTheme, subtitle }) {
  return (
    <div className="app-shell">
      <main className="main-panel">
        <Header title="Biblioteca Cesumar" subtitle={subtitle} />

        <div className="page-shell">
          <div className="layout-toolbar">
            <Breadcrumbs />
            <button className="button-secondary" type="button" onClick={onToggleTheme}>
              {theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
            </button>
          </div>

          <Outlet />
        </div>
      </main>
    </div>
  )
}
