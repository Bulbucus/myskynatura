import classes from './Produto.module.scss';

import produto1 from '../../../assets/produto1.jpg';

const Produto = () => {


  return (
    <div className={classes.box}>
      <div className={classes.Grid}>
        <img className={classes.Produto} alt={'produto'} src={produto1}></img>
        <p className={classes.Description}><span className={classes.MiniTitle}>Nome:</span>Lorem ipsum dolor sit amet consectetur</p>
        <p className={classes.Description}><span className={classes.MiniTitle}>Tipo de pele:</span> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
      <p className={classes.Description}><span className={classes.MiniTitle}>Descrição:</span>Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Vivamus sollicitudin ac elit in mattis. Curabitur dapibus aliquet nisl quis semper. Suspendisse a faucibus orci. Nam vulputate quam sed risus imperdiet.
      </p>
      <div className={classes.separador}></div>
      <div className={classes.Container}>
        <div className={classes.Price}>999,99$</div>
        <button className={classes.button}>Comprar</button>
      </div>
    </div>
  )
}

export default Produto;