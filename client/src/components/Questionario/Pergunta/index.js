import {
  useHistory,
} from 'react-router-dom';
import { useCookies } from 'react-cookie';


import classes from './Pergunta.module.css'

const Pergunta = (props) => {

  // States
  const history = useHistory()
  const [cookie, setCookies] = useCookies();

  // Funçao
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
            defaultChecked={(cookie[props.numPergunta] && cookie[props.numPergunta].resposta === resposta.respostaName) || false}
            required={true}
            />
        }

        {props.type === 'checkbox' && 
          <input 
            type={props.type} 
            name={props.pergunta} 
            value={resposta.respostaName} 
            defaultChecked={(cookie[props.numPergunta] && cookie[props.numPergunta].resposta.includes(resposta.respostaName)) || false}
            />
        }

        <span className={classes.customMark}></span>
      </label>)
    });

    return respostasCriadas;
  })()

  // Handler
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
  
    const expiresCookie = new Date()
    expiresCookie.setDate(31)

    setCookies(props.numPergunta,
    {
      resposta:  event.target[props.pergunta].value || checked
    }, 
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
          onSubmit={(event) => submitHandler(event)}>
          {criarRespostas.map((resposta) => resposta)}
        </form>
      </div>
        <label className={classes.containerSeguinte}>
          Seguinte Pergunta
          <input 
          style={{display:'none'}} 
          type='submit' form={props.numPergunta}/>
        </label>
    </>
  )
}

export default Pergunta;