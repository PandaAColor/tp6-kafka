import { useState, useEffect } from 'react'
import { socket } from './socket'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Card from './componentes/card'
import Fallos from './componentes/fallos'

function App() {
  const [customerId, setCustomerId] = useState(1)
  const [nombre_plan, setNombre_plan] = useState('Plan 1')
  const [error, setError] = useState('ninguno')
  const [cargando, setCargando] = useState(false)
  const [eventos, setEventos] = useState([])
  const [respuesta, setRespuesta] = useState(null)
  const [resultadoSaga, setResultadoSaga] = useState(null)

  // Escuchar los eventos de la saga en tiempo real
  useEffect(() => {
    // CAMBIO: extrae el envelope si viene envuelto (payload.evento ?? payload)
    const agregar = (payload) => {
      const evento = payload.evento ?? payload
      setEventos((prev) => [...prev, { ...evento, timestamp: new Date() }])
    }

    socket.on('activation.requested', agregar)
    socket.on('billing.events', agregar)
    socket.on('provisioning.events', agregar)
    socket.on('activation.completed', agregar)
    socket.on('activation.failed', agregar)

    // Detectar el fin de la saga
    socket.on('activation.completed', (p) => setResultadoSaga({ estado: 'ok', ...p }))
    socket.on('activation.failed', (p) => setResultadoSaga({ estado: 'error', ...p }))

    return () => {
      socket.off('activation.requested', agregar)
      socket.off('billing.events', agregar)
      socket.off('provisioning.events', agregar)
      socket.off('activation.completed', agregar)
      socket.off('activation.failed', agregar)
      socket.off('activation.completed')
      socket.off('activation.failed')
    }
  }, [])

  const enviar = () => {
    console.log("OnClick ejecutado")
    setCargando(true)
    setResultadoSaga(null)  // resetear al enviar
    fetch('http://localhost:3000/activation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        customerId: customerId,
        plan: nombre_plan,
        motivo_fallo: error
      })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data)
        setCargando(false)
        setRespuesta(data)
      })
      .catch((error) => {
        console.error('Error:', error)
        setCargando(false)
      })
  }

  return (
    <>
      <section id="center">
        <div>
          <h1>Contratar Plan</h1>
          <fieldset>
            <label htmlFor='customerId'>Customer ID: </label>
            <input
              type='int'
              id='customerid'
              value={customerId}
              onChange={(e) => {
                setCustomerId(Number(e.target.value))
                setEventos([])          // limpia la timeline
                setRespuesta(null)      // limpia la respuesta anterior
                setResultadoSaga(null)  // limpia el resultado de la saga
              }}
            />

          </fieldset>

          <div className='horizontal'>
            <Card nombre_plan={'Plan 1'} precio={10} onSelect={setNombre_plan}></Card>
            <Card nombre_plan={'Plan 2'} precio={20} onSelect={setNombre_plan}></Card>
            <Card nombre_plan={'Plan 3'} precio={30} onSelect={setNombre_plan}></Card>
          </div>
          plan seleccionado: {nombre_plan}
        </div>

        <div className='horizontal'>
          <Fallos onSelect={setError}></Fallos>
          <Fallos fallo={'billing'} onSelect={setError}></Fallos>
          <Fallos fallo={'provisioning'} onSelect={setError}></Fallos>
        </div>

        <div>
          error seleccionado: {error}
        </div>

        <button
          type="button"
          className="enviar"
          onClick={enviar}
        >
          Enviar
        </button>
        {cargando && <div>Cargando...</div>}

        {respuesta && (
          <div className="respuesta">
            <strong>Respuesta:</strong> {JSON.stringify(respuesta)}
          </div>
        )}

        {/* Resultado de la saga (error simulado) */}
        {resultadoSaga && (
          <div className={`respuesta ${resultadoSaga.estado === 'error' ? 'error' : 'ok'}`}>
            <strong>Resultado:</strong>{' '}
            {resultadoSaga.estado === 'error'
              ? `Activación fallida (${resultadoSaga.payload?.billing ?? '?'} / ${resultadoSaga.payload?.provisioning ?? '?'})`
              : 'Activación completada'}
          </div>
        )}

        {/* Timeline en vivo de la saga */}
        <div className="timeline">
          <h3>Timeline de la activación</h3>
          {eventos.length === 0 ? (
            <p>Sin eventos todavía. Enviá una solicitud para ver el flujo.</p>
          ) : (
            <ul>
              {eventos.map((e, i) => (
                <li key={i} className={`evento ${esError(e) ? 'error' : ''}`}>
                  <strong>{e.eventType}</strong> · cliente{' '}
                  {e.customerId} · {e.correlationId}
                  <span className="hora">
                    {e.timestamp.toLocaleTimeString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  )
}

// Helper para saber si un evento es de error
function esError(e) {
  return (
    e.eventType === 'ActivationFailed' ||
    e.eventType === 'BillingFailed' ||
    e.eventType === 'ProvisioningFailed'
  )
}

export default App
