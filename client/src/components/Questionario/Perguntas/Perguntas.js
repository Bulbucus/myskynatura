import { useEffect, useContext, useState } from 'react';
import { QuestionarioContext } from '../Questionario';
import axios from 'axios';

import classes from './Perguntas.module.scss';

import Pergunta from './Pergunta/Pergunta'

import {ErrorMessage} from '../../../util/ErrorHandler/ErrorHandler';

const Perguntas = ({error}) => {

  // Recebe do API os dados
  const [perguntas, setPerguntas] = useState()

  // Envia para o parent
  const [state, dispatch] = useContext(QuestionarioContext)

  // recebe o valor do child e substitui o elemento na array,
  // evitando assim que se repita
  const pushResposta = (index, value) => {
    // faz uma copia da array
    const copyRespostas = state.questionario.slice();
    // substitui na copia da array o valor
    copyRespostas[index] = value;
    dispatch({type:'put_value_questionario', array:copyRespostas});
  }

  //Recebe as perguntas via API, assim fica mais facil adicionar perguntas novas
  useEffect(() => {
    axios.get('http://95.93.159.118:8888/perguntas')
      .then((response) => {
        // preenche o state perguntas com os dados de cada pergunta
        setPerguntas(response.data.perguntas)
        // coloca logo na array do store quantas respostas sao necessarias
        dispatch({type:'put_value_questionario', array: Array(response.data.perguntas.length)})
      })
    },[dispatch])

  return (
    <div name='Perguntas'>
    <div className={classes.container}>
      <div className={classes.title}>Inicio do questionário</div>
    </div>
      {perguntas 
      && 
      perguntas.map((perguntas, index) =>
      <> 
        {/*esta operaçao ser para que a message de erro apareça so na primeira pergunta e nao em todas as que acontece o erro:*/}
        {(state.incomplete_question.message && state.incomplete_question.index === index)
        && 
        <div style={{marginLeft:'10px'}}><ErrorMessage errorMessage={state.incomplete_question.message}></ErrorMessage></div>}
        <Pergunta 
          index={index} 
          key={perguntas.id_pergunta} 
          name={perguntas.id_pergunta} 
          pergunta={perguntas.pergunta} 
          respostas={perguntas.respostas} 
          id={perguntas.tags} 
          onClick={(event) => {pushResposta(index, event.target.value); dispatch({type:'incomplete_question', message:''})}}
        />
      </>
      )}
    </div>
  )
}

export default Perguntas;