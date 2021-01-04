import Inicial from './Inicial';
import Separador from './Separador';
import InfoInicial from './InfoInicial'

const Inicio = () => {
  // Render
  return (
    <>
      <Inicial></Inicial>
      <Separador bottom={"7px"}></Separador>
      <InfoInicial></InfoInicial>
      <Separador></Separador>
    </>    
  )
}

export default Inicio;