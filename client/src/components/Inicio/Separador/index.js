import classes from './Separador.module.css'

const Separador = (props) => {
  // Render
  return (
    <div className={classes.separador} style={{bottom:props.bottom}}>
    </div>
  )
}

export default Separador;