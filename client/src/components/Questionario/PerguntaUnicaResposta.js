import {
  Link
} from 'react-router-dom';
import { useCookies } from 'react-cookie';


import classes from './Questionario.module.css'

const PerguntaUnicaResposta = (props) => {

  const [cookie, setCookie] = useCookies();

  const criarRespostas = (() => {
    let {respostas} = props; 
    
    let respostasCriadas = [];

    respostas.forEach(resposta => {
      respostasCriadas.push(
      <label key={resposta.respostaName}>
        {resposta.respostaText}
        <input type='radio' name={props.pergunta} value={resposta.respostaName}></input>
      </label>)
    });
    return respostasCriadas;
  })()

  return(
    <>
      <div className={classes.containerQuestao}>
        {props.pergunta}
      </div>
      <div className={classes.containerForma}>
        <form id={props.numPergunta}>
          {criarRespostas.map((resposta) => resposta)}
        </form>
      </div>
      <div className={classes.containerSeguinte}>
      <label>
        Seguinte Pergunta
        <input style={{display:'none'}} type='submit' form={props.numPergunta}></input>
      </label>
      </div>
    </>
  )
}

export default PerguntaUnicaResposta;