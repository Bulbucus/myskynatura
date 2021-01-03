import classes from "./Produto.module.css";

import produto1 from "../../../images/produto1.jpg"

const Produto = (props) => {

  return (
    <div className={classes.main}>
      <img alt="creme" src={produto1} className={classes.image}></img>
      <div className={classes.descricao}>
        <div><span>Nome:</span> {props.nome}</div>
        <div><span>Tipo de pele:</span> {props.tipodepele}</div>
        <div><span>Descrição:</span> {props.descricao}</div>
      </div>
      <div className={classes.comprar}>
        <div>{props.preco},00€</div>
        <div>Comprar</div>
      </div>
    </div>
  )
}

export default Produto;