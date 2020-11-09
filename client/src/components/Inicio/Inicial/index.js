import {
  Link
} from 'react-router-dom';

import {ReactComponent as Logo } from '../../../images/Logo3.1.svg';

import classes from './Inicial.module.css'

const Inicial = () => {
  // Render
  return (
    <div className={classes.imagemPorTras}>
      <div className={classes.conteudo}>
        <Logo className={classes.logo}></Logo>
        <p className={classes.pequenaDescr}>Descubra os melhores produtos sem sair de casa</p>
      </div>
      <Link className={classes.botaoQuestionario} to='/questionario/pergunta1'>Questionário</Link>
      <p className={classes.descricao}>Faça já o nosso questionário 
        <br/>e descubra quais os produtos 
        <br/>mais indicados para a sua pele.
      </p>
    </div>
  )
}

export default Inicial;