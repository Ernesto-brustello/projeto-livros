import { useMemo, useState } from 'react'

const initialUsers = [
  { id: 1, name: 'Ana Souza', role: 'Bibliotecária' },
  { id: 2, name: 'Carlos Lima', role: 'Administrador' },
]

export default function Usuarios() {
  const [users, setUsers] = useState(initialUsers)
  const [form, setForm] = useState({ name: '', role: '' })

  const totalUsers = useMemo(() => users.length, [users])

  const addUser = (event) => {
    event.preventDefault()

    if (!form.name.trim() || !form.role.trim()) return

    setUsers((current) => [
      ...current,
      {
        id: Date.now(),
        name: form.name.trim(),
        role: form.role.trim(),
      },
    ])

    setForm({ name: '', role: '' })
  }

  const removeUser = (id) => {
    setUsers((current) => current.filter((user) => user.id !== id))
  }

  return (
    <div className="page-shell">
      <h1>Usuários</h1>
      <p>Cadastre e acompanhe os usuários do sistema.</p>

      <section className="hero-search">
        <div className="search-shell">
          <form onSubmit={addUser} style={{ display: 'flex', gap: '0.75rem', width: '100%', flexWrap: 'wrap' }}>
            <input
              type="text"
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              placeholder="Nome do usuário"
              style={{ flex: '1 1 220px' }}
            />
            <input
              type="text"
              value={form.role}
              onChange={(event) => setForm((current) => ({ ...current, role: event.target.value }))}
              placeholder="Função"
              style={{ flex: '1 1 220px' }}
            />
            <button className="button-secondary" type="submit">
              Adicionar
            </button>
          </form>
        </div>
      </section>

      <div className="cards-wrapper">
        <article className="book-card book-bar">
          <div className="book-body">
            <h2>Usuários cadastrados</h2>
            <p className="book-author">{totalUsers}</p>
          </div>
        </article>
      </div>

      <div className="cards-wrapper">
        {users.map((user) => (
          <article key={user.id} className="book-card book-bar">
            <div className="book-body">
              <h2>{user.name}</h2>
              <p className="book-author">{user.role}</p>
              <div className="book-actions">
                <button className="button-tertiary" type="button" onClick={() => removeUser(user.id)}>
                  Remover
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
