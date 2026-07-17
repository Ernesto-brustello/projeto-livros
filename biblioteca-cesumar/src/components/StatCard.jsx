export default function StatCard({ title, value, actions }) {
  return (
    <article className="book-card book-bar">
      <div className="book-body">
        <div>
          <h2>{title}</h2>
          <p className="book-author">{value}</p>
        </div>
        {actions && <div className="book-actions">{actions}</div>}
      </div>
    </article>
  )
}
