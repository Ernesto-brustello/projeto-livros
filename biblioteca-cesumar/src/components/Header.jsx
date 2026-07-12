import { NavLink } from 'react-router-dom'

const navigation = [
  { path: '/', label: 'Dashboard' },
  { path: '/livros', label: 'Livros' },
  { path: '/categorias', label: 'Categorias' },
  { path: '/usuarios', label: 'Usuários' },
  { path: '/configuracoes', label: 'Configurações' },
]

export default function Header({ title, subtitle }) {
  return (
    <header className="topbar">
      <div className="brand-block">
        <div className="brand-mark" translate="no" aria-label="BC">
          BC
        </div>
        <div>
          <div className="logo">{title}</div>
          {subtitle && <p className="page-subtitle">{subtitle}</p>}
        </div>
      </div>

      <nav className="top-nav" aria-label="Navegação principal">
        {navigation.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
