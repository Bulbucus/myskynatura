import { useEffect, useContext, useState } from 'react';
import { QuestionarioContext } from '../Questionario';
import axios from 'axios';

import classes from './Perguntas.module.scss';

import Pergunta from './Pergunta/Pergunta'

import {ErrorMessage} from '../../../util/ErrorHandler/ErrorHandler';
import {ReactComponent as Loading} from '../../../assets/Loading.svg';

import checkEnv from '../../../production/checkEnv';

const Perguntas = () => {

  // Recebe do API os dados
  const [perguntas, setPerguntas] = useState()
  const [loading, setLoading] = useState(true)

  // Envia para o parent
  const [state, dispatch] = useContext(QuestionarioContext)

  // criei uma handler para quando envia a resposta para o stora no parent
  const pushResposta = (type, index, name ,value) => {

    

    // faz uma copia da array pois todos os states sao immutables
    const copyRespostas = state.questionario.slice();
    if (type === 'radio') {
      // substitui na copia da array o valor
      copyRespostas[index] = value;
      return dispatch({type:'put_value_questionario', array:copyRespostas});
    }

    let id;
    perguntas[index].tags.forEach((el, i) => {
      if(el.includes('_nenhum')){
          id = perguntas[index].id[i].toString();
        }
    })
   

    if (type === 'checkbox') {
      // se selecionar a opçao nenhum (nenhuma das anterios),
      // remove tanto da array do state tanto do dom os valores com check
    
      if(value === id){
        
        const elements = document.getElementsByName(name);
        for (let element of elements) {
          if(!(element.id === id)){          
            element.checked = false;
          }
        }
        copyRespostas[index] = [value]
        return dispatch({type:'put_value_questionario', array:copyRespostas});
      }
      
      // se o valor ja foi selecionado e se user carregou de novo o valor vai ficar
      // unchecked por isso tem de se retirar da array
      if(copyRespostas[index] && copyRespostas[index].includes(value)){
        const id = copyRespostas[index].findIndex(element => element === value );
        copyRespostas[index].splice(id, 1)
        return dispatch({type:'put_value_questionario', array:copyRespostas});
      }
      
      // se o valor nenhum (nenhuma das anterios) estiver selecionado e
      // o utilizador selecionar outra opçao,
      // tira lhe o checked feito no dom para evitar complitos na experiencia
      // do utilizador e tambem tira-o da array
      const elements = document.getElementsByName(name);
      for (let element of elements) {
        if(element.id === id){
          element.checked = false;
        }
      }
      // se no state nao existir uma array para os valores de checkbox (escolhas multiplas)
      // cria uma array e coloca o tal valor
      if(copyRespostas[index] === undefined) {
        copyRespostas[index] = [value]
      } else {
        // procura na array se existe a seleçao nenhum (nenhuma das anterios) e apaga se tal existir
        const findNenhum = copyRespostas[index].findIndex(el => (el === id) === true)
        if(findNenhum > -1){
          copyRespostas[index].splice(findNenhum, 1)
        }
        // puxa o valor para array ja existente
        copyRespostas[index].push(value)
      }
      return dispatch({type:'put_value_questionario', array:copyRespostas});
    }
   
  }

  //Recebe as perguntas via API, assim fica mais facil adicionar perguntas novas
  useEffect(() => {
    axios.get(`${checkEnv()}/api/perguntas`)
      .then((response) => {
        setLoading(false)
        // preenche o state perguntas com os dados de cada pergunta
        setPerguntas(response.data.perguntas)
        // coloca logo na array do store quantas respostas sao necessarias
        dispatch({type:'put_value_questionario', array: Array(response.data.perguntas.length)})
      })
    },[dispatch])

  return (
    <div name='Perguntas' key='1'>
    <div className={classes.container}>
      <div className={classes.title}>Inicio do questionário</div>
    </div>
      {loading ?
      <Loading className={classes.loading}></Loading> 
      :
      perguntas && perguntas.map((perguntas, index) =>
      <div key={perguntas.id_pergunta} > 
        {/*esta operaçao ser para que a message de erro apareça so na primeira pergunta e nao em todas as que acontece o erro:*/}
        {(state.incomplete_question.message && state.incomplete_question.index === index)
        && 
        <div style={{marginLeft:'10px'}}><ErrorMessage errorMessage={state.incomplete_question.message}></ErrorMessage></div>}
        <Pergunta 
          type={perguntas.type_pergunta}
          index={index} 
          name={perguntas.id_pergunta} 
          pergunta={perguntas.pergunta}
          respostas={perguntas.respostas} 
          id={perguntas.id} 
          onClick={(event) => {
            pushResposta(perguntas.type_pergunta, index, perguntas.id_pergunta ,event.target.value); 
            dispatch({type:'incomplete_question', message:''})
          }}
        />
      </div>
      )}
    </div>
  )
}

export default Perguntas;