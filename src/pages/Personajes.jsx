import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './personajes.css'

const ESTADOS = { Alive: 'Vivo', Dead: 'Muerto', unknown: 'Desconocido' }

function Detalle({ personaje, cerrar }) {
  const dialogo = useRef(null)

  useEffect(() => {
    const elemento = dialogo.current
    elemento.showModal()
    return () => elemento.close()
  }, [])

  return (
    <dialog className="rm-detalle" ref={dialogo} onCancel={cerrar} aria-labelledby="rm-nombre">
      <div className="rm-detalle-cuerpo">
        <img src={personaje.image} alt="" width="300" height="300" />
        <div>
          <h2 id="rm-nombre">{personaje.name}</h2>
          <dl>
            <dt>Estado</dt><dd>{ESTADOS[personaje.status] ?? personaje.status}</dd>
            <dt>Especie</dt><dd>{personaje.species}</dd>
            <dt>Origen</dt><dd>{personaje.origin.name}</dd>
            <dt>Última ubicación</dt><dd>{personaje.location.name}</dd>
            <dt>Episodios en los que aparece</dt><dd>{personaje.episode.length}</dd>
          </dl>
          <button className="btn-primario" onClick={cerrar}>Cerrar detalle</button>
        </div>
      </div>
    </dialog>
  )
}

function Resultados({ nombre, pagina, cambiarPagina }) {
  const [datos, setDatos] = useState(null)
  const [error, setError] = useState(false)
  const [intento, setIntento] = useState(0)
  const [seleccionado, setSeleccionado] = useState(null)

  useEffect(() => {
    const controlador = new AbortController()
    async function cargar() {
      const url = new URL('https://rickandmortyapi.com/api/character')
      url.searchParams.set('page', pagina)
      if (nombre) url.searchParams.set('name', nombre)

      try {
        const respuesta = await fetch(url, { signal: controlador.signal })
        if (respuesta.status === 404 && nombre) {
          if (!controlador.signal.aborted) setDatos({ results: [] })
          return
        }
        if (!respuesta.ok) throw new Error('Error al consultar personajes')
        const resultado = await respuesta.json()
        if (!controlador.signal.aborted) setDatos(resultado)
      } catch {
        if (!controlador.signal.aborted) setError(true)
      }
    }
    cargar()
    return () => controlador.abort()
  }, [nombre, pagina, intento])

  if (error) return (
    <div className="rm-aviso">
      <p role="alert">No se pudieron cargar los personajes.</p>
      <button className="btn-secundario" onClick={() => { setError(false); setIntento(intento + 1) }}>Reintentar</button>
    </div>
  )
  if (!datos) return <p role="status" className="rm-aviso">Cargando personajes…</p>
  if (!datos.results.length) return <p role="status" className="rm-aviso">Sin resultados para «{nombre}».</p>

  return (
    <>
      <div className="rm-controles">
        <span role="status">{datos.info.count} {datos.info.count === 1 ? 'personaje' : 'personajes'}</span>
        <nav aria-label="Páginas de personajes">
          <button className="btn-secundario" disabled={!datos.info.prev} onClick={() => cambiarPagina(pagina - 1)}>Anterior</button>
          <span>{pagina} de {datos.info.pages}</span>
          <button className="btn-secundario" disabled={!datos.info.next} onClick={() => cambiarPagina(pagina + 1)}>Siguiente</button>
        </nav>
      </div>
      <ul className="rm-lista">
        {datos.results.map(personaje => (
          <li key={personaje.id}>
            <button className="rm-personaje" onClick={() => setSeleccionado(personaje)} aria-haspopup="dialog">
              <img src={personaje.image} alt="" loading="lazy" width="300" height="300" />
              <span className="rm-ficha">
                <strong>{personaje.name}</strong>
                <span>{ESTADOS[personaje.status] ?? personaje.status} · {personaje.species}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
      {seleccionado && <Detalle personaje={seleccionado} cerrar={() => setSeleccionado(null)} />}
    </>
  )
}

export default function Personajes() {
  const [texto, setTexto] = useState('')
  const [consulta, setConsulta] = useState({ nombre: '', pagina: 1 })

  useEffect(() => {
    const nombre = texto.trim()
    if (nombre === consulta.nombre) return
    const temporizador = setTimeout(() => setConsulta({ nombre, pagina: 1 }), 350)
    return () => clearTimeout(temporizador)
  }, [texto, consulta.nombre])

  return (
    <main className="rm-pagina">
      <Link className="rm-volver" to="/menu">← Volver al menú</Link>
      <h1>Personajes de Rick y Morty</h1>
      <label className="rm-busqueda">
        Buscar por nombre
        <input type="search" placeholder="Ej. Rick Sanchez" value={texto} onChange={e => setTexto(e.target.value)} />
      </label>
      <Resultados key={JSON.stringify([consulta.nombre, consulta.pagina])}
        nombre={consulta.nombre} pagina={consulta.pagina}
        cambiarPagina={pagina => setConsulta({ ...consulta, pagina })} />
    </main>
  )
}
