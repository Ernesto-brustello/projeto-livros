import { NavLink } from 'react-router-dom'

const navigation = [
  { path: '/', label: 'Dashboard', icon: '🏠' },
  { path: '/livros', label: 'Livros', icon: '📚' },
  { path: '/categorias', label: 'Categorias', icon: '🗂️' },
  { path: '/usuarios', label: 'Usuários', icon: '👥' },
  { path: '/configuracoes', label: 'Configurações', icon: '⚙️' },
]

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">BC</div>
      <nav className="nav-icons">
        {navigation.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
            title={item.label}
          >
            {item.icon}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
