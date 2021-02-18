import classes from './Produto.module.scss';

const Produto = ({nome, descricao, price, link, linkImage}) => {


  return (
    <div className={classes.box}>
      <div className={classes.Grid}>
        <img className={classes.Produto} alt={'produto'} src={linkImage}></img>
        <p className={classes.Description}><span className={classes.MiniTitle}>Nome:</span>{nome}</p>
        <p className={classes.Description}><span className={classes.MiniTitle}>Descrição:</span>
        {descricao}
        </p>
      </div>
      <div className={classes.separador}></div>
      <div className={classes.Container}>
        <div className={classes.Price}>{price}€</div>
        <a target='_blank' rel="noreferrer" href={link} className={classes.button}>Comprar</a>
      </div>
    </div>
  )
}

export default Produto;