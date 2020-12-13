import {
  useHistory,
} from 'react-router-dom';
import { useCookies } from 'react-cookie';

//redux
import {connect} from 'react-redux';
import actions from '../../../redux/actions';

import classes from './Pergunta.module.css'

const Pergunta = (props) => {

  // States
  const history = useHistory()
  const [cookie, setCookies] = useCookies();

  // Funçao
  // Funçao que cria automaticamente a forma em checkbox ou em radio quando se cria no parent <Pergunta/>
  const criarRespostas = (() => {
    let {respostas} = props; 
    
    let respostasCriadas = [];

    respostas.forEach(resposta => {
  
      respostasCriadas.push(
      <label key={resposta.respostaName}>

        {resposta.respostaText}

        {props.type === 'radio' && 
          <input 
            type={props.type} 
            name={props.pergunta} 
            value={resposta.respostaName} 
            defaultChecked={(cookie[props.numPergunta] && cookie[props.numPergunta] === resposta.respostaName) || false}
            required={true}
            />
        }

        {props.type === 'checkbox' && 
          <input 
            type={props.type} 
            name={props.pergunta} 
            value={resposta.respostaName} 
            defaultChecked={(cookie[props.numPergunta] && cookie[props.numPergunta].includes(resposta.respostaName)) || false}
            />
        }

        <span className={classes.customMark}></span>
      </label>)
    });

    return respostasCriadas;
  })()

  // Handler
  // Quando se carrega para a seguinte pergunta se for checkbox guarda as varias respostas numa array;
  const submitHandler = (event) => {
    event.preventDefault()
    let checked;
  
    if(props.type === 'checkbox') {

      checked = [];
      let checkboxs = event.target[props.pergunta]
  
      checkboxs.forEach(checkbox => {
        if(checkbox.checked){
          checked.push(checkbox.value)
        }
      })
      if(checked.length < 1) {
        return;
      }
    }
  
    // colocar na store do redux
    props.cookiesQuestionario(props.numPergunta, event.target[props.pergunta].value || checked)

    // Criar cookie que dura por 30 dias com a resposta
    // Serve apenas para quando alguem esta a fazer o questionario e deixa o questionario a meio antes de se registar ou fecha a pagina sem querer;
    const expiresCookie = new Date()
    expiresCookie.setDate(31)

    setCookies(props.numPergunta,
    event.target[props.pergunta].value || checked,
    {
      path: '/',
      expires:expiresCookie
    });

    history.push('/questionario/pergunta' + (Number(props.numPergunta.match(/[0-9]+/g)) + 1).toString())
  }


  //Render
  return(
    <>
      <div className={classes.containerQuestao}>
          Questão {Number(props.numPergunta.match(/[0-9]+/g))}:
      </div>
      <div className={classes.containerForma}>
        <div className={classes.pergunta}>
          {props.pergunta}<br/>
          {props.type === 'checkbox' && 
            <span>(Pode escolher multiplas respostas)</span>}
        </div>
        <form 
          id={props.numPergunta} 
          onSubmit={(event) => submitHandler(event)}
        >
          {criarRespostas.map((resposta) => resposta)}
        </form>
      </div>
        <label className={classes.containerSeguinte}>
          Seguinte Pergunta
          <input 
          style={{display:'none'}} 
          type='submit' form={props.numPergunta}
          />
        </label>
    </>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    cookiesQuestionario: (name,value) => {dispatch(actions.cookiesQuestionario(name,value))}
  }
}

export default connect(null,mapDispatchToProps)(Pergunta);