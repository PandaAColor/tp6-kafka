import { useState } from "react"
import './card.css'

function Card({nombre_plan = 'Plan 0', precio = 0 ,
    onSelect
}) {

    return (
        <button className="cardPlan"  
        onClick = {() => onSelect(nombre_plan)}>
        <h2>{nombre_plan}</h2>
        <p>${precio}</p>
        </button>

    )
}
export default Card