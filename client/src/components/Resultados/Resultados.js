import classes from './Resultados.module.scss';

import Produto from './Produto/Produto';

const Resultados = () => {

  return(
    <>
    <div className={classes.container}>
      <div className={classes.title}>Os melhores produtos para si são:</div>
    </div>
    <Produto></Produto>
    <Produto></Produto>
    </>
  )
};

export default Resultados