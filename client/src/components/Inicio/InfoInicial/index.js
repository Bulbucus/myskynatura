import classes from './InfoInicial.module.css'

import imagemUm from '../../../images/imagemUm.jpeg'
import imagemDois from '../../../images/imagemDois.jpeg'
import imagemTres from '../../../images/imagemTres.jpeg'

const InfoInicial = () => {
  return(
    <div className={classes.contentor}>
      <div className={classes.imagens}>
      <img alt='imagemUm' className={classes.imagemUm} src={imagemUm}></img>
      <img alt='imagemDois' className={classes.imagemDois} src={imagemDois}></img>
      <img alt='imagemTres' className={classes.imagemTres} src={imagemTres}></img>
      </div>
      <div>
      <h1 className={classes.titlo}>Lorem ipsum dolor sit amet</h1>
      <p className={classes.artigo}>Lorem ipsum dolor sit amet, 
      <br/>consectetur adipiscing elit. 
      <br/>Vivamus eu metus eu odio 
      <br/>rutrum auctor in volutpat odio. 
      <br/>Maecenas porta lacus id justo 
      <br/>sagittis dictum. Nulla semper 
      <br/>efficitur nisl sed dictum. 
      <br/>Vestibulum in dignissim dui, a 
      <br/>venenatis velit. Orci varius 
      <br/>natoque penatibus et magnis dis </p>
      </div>
    </div>
  )
}

export default InfoInicial;