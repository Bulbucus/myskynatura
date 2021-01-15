import {Link} from 'react-router-dom';

import {ReactComponent as Logo}  from '../../assets/Logo3.1.svg';
import handWithOleo from '../../assets/hand_with_oleo.jpeg';

//CSS
import classes from './Inicio.module.scss';

const Inicio = () => {
  return (
    <div className={classes.Intro}>
      <Logo className={classes.Logo}></Logo>
      <p className={classes.Slogan}>Descubra os melhores produtos sem sair de casa!</p>
      <p className={classes.Paragrafo}>Faça já o nosso questionário<br/> e descubra quais os produtos<br/> mais indicados para a sua pele</p>
      <Link className={classes.Questionario} to='/questionario'>Questionário</Link>
      <p className={classes.Paragrafo}>Em <span className={classes.strong}>poucos minutos</span> saiba os<br/> melhores produtos para si</p>
      <span className={classes.Line}></span>
      <img src={handWithOleo} alt="hand with oleo" className={classes.Image}></img>
      <div>
      <p className={classes.Title}>Lorem ipsum dolor sit amet</p>
      <p className={classes.Article}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eu metus eu odio rutrum auctor in volutpat odio. Maecenas porta lacus id justo sagittis dictum. Nulla semper efficitur nisl sed dictum. Vestibulum in dignissim dui, a venenatis velit. Orci varius natoque penatibus et magnis dis </p>
      </div>
    </div>
  )
}

export default Inicio;