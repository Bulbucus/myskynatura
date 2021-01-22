import classes from './Perguntas.module.scss';

import Pergunta from './Pergunta/Pergunta'

const Perguntas = (props) => {
  return (
    <>
    <div className={classes.container}>
      <div className={classes.title}>Inicio do questionário</div>
    </div>
      <Pergunta></Pergunta>
      <Pergunta></Pergunta>
      <Pergunta></Pergunta>
    </>
  )
}

export default Perguntas;