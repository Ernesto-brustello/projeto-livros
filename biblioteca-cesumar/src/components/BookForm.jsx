import { useEffect, useState } from 'react'

const initialForm = {
  title: '',
  author: '',
  isbn: '',
  year: '',
  category: '',
  description: '',
  coverUrl: '',
}

export default function BookForm({ initialData, onCancel, onSubmit }) {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (initialData) {
      setForm(initialData)
    } else {
      setForm(initialForm)
    }
  }, [initialData])

  const validate = () => {
    const nextErrors = {}

    if (!form.title.trim()) {
      nextErrors.title = 'Título é obrigatório.'
    }
    if (!form.author.trim()) {
      nextErrors.author = 'Autor é obrigatório.'
    }
    if (!form.isbn.trim()) {
      nextErrors.isbn = 'ISBN é obrigatório.'
    }
    if (!form.year.trim()) {
      nextErrors.year = 'Ano é obrigatório.'
    }
    if (!form.category.trim()) {
      nextErrors.category = 'Categoria é obrigatória.'
    }
    if (!form.description.trim()) {
      nextErrors.description = 'Descrição é obrigatória.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleChange = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }))
  }

  const handleSubmit = () => {
    if (!validate()) {
      return
    }

    onSubmit(form)
  }

  const formFields = [
    { key: 'title', label: 'Título', value: form.title, error: errors.title, fullWidth: false },
    { key: 'author', label: 'Autor', value: form.author, error: errors.author, fullWidth: false },
    { key: 'isbn', label: 'ISBN', value: form.isbn, error: errors.isbn, fullWidth: false },
    { key: 'year', label: 'Ano', value: form.year, error: errors.year, fullWidth: false },
    { key: 'category', label: 'Categoria', value: form.category, error: errors.category, fullWidth: false },
    { key: 'coverUrl', label: 'Imagem da capa (URL)', value: form.coverUrl, error: null, fullWidth: false },
    { key: 'description', label: 'Descrição', value: form.description, error: errors.description, fullWidth: true },
  ]

  return (
    <div className="modal-overlay">
      <div className="modal-content book-form-modal">
        <h2>{initialData ? 'Editar livro' : 'Adicionar livro'}</h2>

        <div className="form-grid">
          {formFields.map((field) => {
            const isTextarea = field.key === 'description'

            return (
              <label key={field.key} className={field.fullWidth ? 'full-width' : ''}>
                {field.label}
                {isTextarea ? (
                  <textarea
                    rows="4"
                    value={field.value}
                    onChange={(event) => handleChange(field.key, event.target.value)}
                  />
                ) : (
                  <input
                    type="text"
                    value={field.value}
                    onChange={(event) => handleChange(field.key, event.target.value)}
                  />
                )}
                {field.error && <span className="field-error">{field.error}</span>}
              </label>
            )
          })}
        </div>

        <div className="modal-actions">
          <button className="button-tertiary" type="button" onClick={onCancel}>
            Cancelar
          </button>
          <button className="button-secondary" type="button" onClick={handleSubmit}>
            Salvar
          </button>
        </div>
      </div>
    </div>
  )
}
