import classes from './Produto.module.scss';

import produto1 from '../../../assets/produto1.jpg';

const Produto = ({nome, descricao, price}) => {


  return (
    <div className={classes.box}>
      <div className={classes.Grid}>
        <img className={classes.Produto} alt={'produto'} src={produto1}></img>
        <p className={classes.Description}><span className={classes.MiniTitle}>Nome:</span>{nome}</p>
        <p className={classes.Description}><span className={classes.MiniTitle}>Tipo de pele:</span> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
      <p className={classes.Description}><span className={classes.MiniTitle}>Descrição:</span>
      {descricao}
      </p>
      <div className={classes.separador}></div>
      <div className={classes.Container}>
        <div className={classes.Price}>{price}€</div>
        <button className={classes.button}>Comprar</button>
      </div>
    </div>
  )
}

export default Produto;