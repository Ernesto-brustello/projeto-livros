export default function Header({ title, subtitle, theme, onToggleTheme }) {
  return (
    <header className="topbar">
      <div>
        <div className="logo">{title}</div>
        {subtitle && <p className="page-subtitle">{subtitle}</p>}
      </div>
      <button className="theme-toggle" type="button" onClick={onToggleTheme}>
        {theme === 'dark' ? '☀️ light' : '🌙 dark'}
      </button>
    </header>
  )
}
