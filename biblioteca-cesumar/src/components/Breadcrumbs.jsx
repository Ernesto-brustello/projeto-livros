import { Link, useLocation } from 'react-router-dom'
import { navigationRoutes } from '../data/navigation.js'

const labelBySegment = {
  livros: 'Livros',
  categorias: 'Categorias',
  usuarios: 'Usuários',
  configuracoes: 'Configurações',
}

export default function Breadcrumbs() {
  const location = useLocation()
  const segments = location.pathname.split('/').filter(Boolean)

  const crumbs = [{ path: '/', label: 'Dashboard' }]

  segments.forEach((segment, index) => {
    const path = `/${segments.slice(0, index + 1).join('/')}`
    const label = labelBySegment[segment] || segment
    crumbs.push({ path, label })
  })

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      {crumbs.map((crumb, index) => (
        <span key={crumb.path} className="breadcrumb-item">
          {index > 0 && <span className="breadcrumb-separator">/</span>}
          {index === crumbs.length - 1 ? (
            <span aria-current="page">{crumb.label}</span>
          ) : (
            <Link to={crumb.path}>{crumb.label}</Link>
          )}
        </span>
      ))}
    </nav>
  )
}
