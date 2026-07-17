import { useEffect, useState } from 'react'

const initialSettings = {
  darkMode: false,
  notifications: true,
  compactMode: false,
}

export default function Configuracoes() {
  const [settings, setSettings] = useState(initialSettings)

  useEffect(() => {
    const savedSettings = window.localStorage.getItem('biblioteca-settings')

    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings))
      } catch {
        window.localStorage.removeItem('biblioteca-settings')
      }
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('biblioteca-settings', JSON.stringify(settings))
  }, [settings])

  const updateSetting = (field, value) => {
    setSettings((current) => ({ ...current, [field]: value }))
  }

  const settingCards = [
    {
      title: 'Modo escuro',
      label: 'Ativar',
      checked: settings.darkMode,
      value: 'darkMode',
      description: 'Ativar',
    },
    {
      title: 'Notificações',
      label: 'Receber alertas',
      checked: settings.notifications,
      value: 'notifications',
      description: 'Receber alertas',
    },
    {
      title: 'Modo compacto',
      label: 'Reduzir espaçamento',
      checked: settings.compactMode,
      value: 'compactMode',
      description: 'Reduzir espaçamento',
    },
  ]

  return (
    <div className="page-shell">
      <h1>Configurações</h1>
      <p>Ajuste as preferências do sistema de forma simples.</p>

      <div className="cards-wrapper">
        {settingCards.map((card) => (
          <article key={card.title} className="book-card book-bar">
            <div className="book-body">
              <h2>{card.title}</h2>
              <label className="book-author">
                <input
                  type="checkbox"
                  checked={card.checked}
                  onChange={(event) => updateSetting(card.value, event.target.checked)}
                />{' '}
                {card.label}
              </label>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
