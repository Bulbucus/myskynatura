import React, {useReducer} from 'react';
//import {Link} from 'react-router-dom';
//import axios from 'axios';

import classes from './Questionario.module.scss';

import PersonalInfo from './PersonalInfo/PersonalInfo';
import Perguntas from './Perguntas/Perguntas';
import Registo from './Registo/Registo';

const initialState = {
  personalInfo:{
    primeiro_nome:{
      value:'',
      haveError:true,
      whatError: ''
    },
    ultimo_nome:{
      value:'',
      haveError:true,
      whatError: ''
    },
    genero:{
      value:'',
      haveError:true,
      whatError: ''
    },
    idade:{
      value:'',
      haveError:true,
      whatError: ''
    },
    email:{
      value:'',
      haveError:true,
      whatError: ''
    },
    palavrapasse:{
      value:'',
      haveError:true,
      whatError: ''
    },
    palavrapasseConfirm:{
      value:'',
      haveError:true,
      whatError: ''
    }
  },
  questionario:[],
}

// verifica os valores em tempo real
const checkValue = (input, value) => {

  // se o input for uma data:
  if(input === 'date') {
    const Date = value.split('-')
    if(Date.filter(element => element === '0').length < 1){
      return {haveError:false, whatError:''}
    }
  }

  // se o input for um email:
  if(input === 'email') {
    // regex para verificar se é mesmo um email valido:
    if((/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(value)){
      return {haveError:false, whatError:''}
    }
    return {haveError:true, whatError:'Por favor, coloque um email valido'}
  }

  //se for uma password
  if(input === 'password'){
    if(value.length < 7){
      return {haveError:true, whatError:'A password necessita de ter pelo menos 7 caracteres'}
    } else if (value.search(/[A-Z]/g) === -1){
      return {haveError:true, whatError:'Necessita de pelo menos uma letra maiuscula'}
    }
    return {haveError:false, whatError:''}
  }

  // se for nome ou subnome
  if(input === 'text'){
    if(value.search(/[0-9]|[!-/]|[:-@]|[[-`]|[{-~]/g) !== -1) {  
      return {haveError:true, whatError:'Por favor, colocar apenas letras.'}
    } else if(value.length < 3){
      return {haveError:true, whatError:'Letras insuficientes, precisa mais que 2 letras.'}
    } 
    return {haveError:false, whatError:''}
  }
}

// verifica se a password e confirm_password sao iguais:
const checkPassword = (value, passwordValue) => {
  if(value !== passwordValue){
    return {haveError:true, whatError:'As passwords não são iguais, por favor verifique.'}
  } else if (!passwordValue){
    return {haveError:true, whatError:''}
  }
  return {haveError:false, whatError:''}
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'put_value_personalInfo':
      const checkedValue = checkValue(action.input, action.value)
      return {
        ...state,
        personalInfo:{
          ...state.personalInfo,
          [action.name]:{
            ...state.personalInfo[action.name],
            ...checkedValue,
            value: action.value
          }
        }
      }
    case 'confirm_password':
      const checkedPassword = checkPassword(action.value, action.passwordValue)
      return {
        ...state,
        personalInfo:{
          ...state.personalInfo,
          palavrapasseConfirm:{
            ...state.personalInfo.palavrapasseConfirm,
            ...checkedPassword,
            value: action.value
          }
        }
      }
    case 'put_value_questionario':
      return{
        ...state,
        questionario:action.array
      }
    default:
      break;
  }
}

const Questionario = () => {

  const [state, dispatch] = useReducer(reducer,initialState)

  const fetch = () => {
    if(!state.questionario.includes(undefined)){
      console.log(state.personalInfo)
      console.log(state.questionario)
    }
    
  }

  return (
    <QuestionarioContext.Provider value={[state,dispatch]}>
      <PersonalInfo></PersonalInfo>
      <div className={classes.separador}></div>
      <Perguntas></Perguntas>
      <div className={classes.separador}></div>
      <Registo></Registo>
      <div className={classes.separador}></div>
      <button className={classes.button} onClick={fetch}>Acabar o questionário</button>
    </QuestionarioContext.Provider>
  )
}

export const QuestionarioContext = React.createContext(initialState);

export default Questionario;