import './fallos.css'

function Fallos({fallo = 'ninguno', onSelect}) {
    return(
        <button className="fallo"
        onClick={() => onSelect(fallo)}
        >{fallo}</button>
    )
}
export default Fallos