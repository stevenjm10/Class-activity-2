// Centered white card used as the layout of every simple screen
export default function Card({ title, wide = false, children }) {
  return (
    <main className="page">
      <section className={wide ? 'card card-wide' : 'card'}>
        <h1>{title}</h1>
        {children}
      </section>
    </main>
  )
}
