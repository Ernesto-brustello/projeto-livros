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

  return (
    <div className="modal-overlay">
      <div className="modal-content book-form-modal">
        <h2>{initialData ? 'Editar livro' : 'Adicionar livro'}</h2>

        <div className="form-grid">
          <label>
            Título
            <input
              type="text"
              value={form.title}
              onChange={(event) => handleChange('title', event.target.value)}
            />
            {errors.title && <span className="field-error">{errors.title}</span>}
          </label>

          <label>
            Autor
            <input
              type="text"
              value={form.author}
              onChange={(event) => handleChange('author', event.target.value)}
            />
            {errors.author && <span className="field-error">{errors.author}</span>}
          </label>

          <label>
            ISBN
            <input
              type="text"
              value={form.isbn}
              onChange={(event) => handleChange('isbn', event.target.value)}
            />
            {errors.isbn && <span className="field-error">{errors.isbn}</span>}
          </label>

          <label>
            Ano
            <input
              type="text"
              value={form.year}
              onChange={(event) => handleChange('year', event.target.value)}
            />
            {errors.year && <span className="field-error">{errors.year}</span>}
          </label>

          <label>
            Categoria
            <input
              type="text"
              value={form.category}
              onChange={(event) => handleChange('category', event.target.value)}
            />
            {errors.category && <span className="field-error">{errors.category}</span>}
          </label>

          <label>
            Imagem da capa (URL)
            <input
              type="text"
              value={form.coverUrl}
              onChange={(event) => handleChange('coverUrl', event.target.value)}
            />
          </label>

          <label className="full-width">
            Descrição
            <textarea
              rows="4"
              value={form.description}
              onChange={(event) => handleChange('description', event.target.value)}
            />
            {errors.description && <span className="field-error">{errors.description}</span>}
          </label>
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
