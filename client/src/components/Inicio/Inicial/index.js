import {
  Link
} from 'react-router-dom';
import {connect} from 'react-redux';

import {ReactComponent as Logo } from '../../../images/Logo3.1.svg';

import classes from './Inicial.module.css'

const Inicial = (props) => {
  // Render
  return (
    <div className={classes.imagemPorTras}>
      <div className={classes.conteudo}>
        <Logo className={classes.logo}></Logo>
        <p className={classes.pequenaDescr}>Descubra os melhores produtos sem sair de casa</p>
      </div>
      <Link className={classes.botaoQuestionario} to={props.user.id && props.user.token ? "/resultado"  :"/questionario/pergunta1"}>
        {props.user.id && props.user.token ? "Resultado do questionário"  :"Questionário"}
        <div className={classes.arrowContainer}>
        <svg className={[classes.arrow, classes.left].join(' ')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 81.32 156.94">
          <polyline points="79.86 1.41 2.83 78.45 79.9 155.53"/>
        </svg>
        <svg className={classes.arrow} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 81.32 156.94">
          <polyline points="79.86 1.41 2.83 78.45 79.9 155.53"/>
        </svg>
        </div>
      </Link>
      <p className={classes.descricao}>Faça já o nosso questionário 
        <br/>e descubra quais os produtos 
        <br/>mais indicados para a sua pele.
      </p>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    ...state
  }
}


export default connect(mapStateToProps)(Inicial);