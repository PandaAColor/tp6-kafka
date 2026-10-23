import { useState } from 'react'
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
  const enviar = () => {
    console.log("OnClick ejecutado")
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
      })
      .catch((error) => {
        console.error('Error:', error)
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
              id= 'customerid'
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}

            />
          </fieldset>

          <div className='horizontal'>
            <Card nombre_plan = {'Plan 1'} precio = {10} onSelect = {setNombre_plan}></Card>
            <Card nombre_plan={'Plan 2'} precio = {20} onSelect={setNombre_plan}></Card>
            <Card nombre_plan={'Plan 3'} precio = {30} onSelect={setNombre_plan}></Card>
            
          </div>
          plan seleccionado: {nombre_plan}
        </div>

        <div className='horizontal'>
          <Fallos onSelect = {setError}></Fallos>
          <Fallos fallo = {'billing'} onSelect = {setError}></Fallos>
          <Fallos fallo = {'provisioning'} onSelect = {setError}></Fallos>
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
      </section>

    </>
  )
}

export default App
