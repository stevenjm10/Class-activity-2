import { useNavigate } from 'react-router-dom'

export default function Menu({ usuario, onLogout }) {
  const navigate = useNavigate()

  const salir = () => {
    onLogout()
    navigate('/')
  }

  return (
    <main className="pantalla">
      <section className="tarjeta">
        <h1>Hola, {usuario}</h1>
        <p className="subtitulo">Elige una aplicación</p>
        <button className="btn-primario" onClick={() => navigate('/suma')}>SUM</button>
        <button className="btn-primario" onClick={() => navigate('/calculadora')}>Calculator</button>
        <button className="btn-secundario" onClick={salir}>Cerrar sesión</button>
      </section>
    </main>
  )
}
