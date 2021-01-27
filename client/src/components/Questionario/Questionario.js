import React, {useReducer} from 'react';
//import {Link} from 'react-router-dom';
//import axios from 'axios';

import classes from './Questionario.module.scss';

import {checkValue, checkPassword} from '../../util/Validation/checkValue'



import PersonalInfo from './PersonalInfo/PersonalInfo';
import Perguntas from './Perguntas/Perguntas';
import Registo from './Registo/Registo';

const initialState = {
  personalInfo:{
    primeiro_nome:{
      type:'text',
      value:'',
      haveError:true,
      whatError: ''
    },
    ultimo_nome:{
      type:'text',
      value:'',
      haveError:true,
      whatError: ''
    },
    genero:{
      type:'text',
      value:'',
      haveError:true,
      whatError: ''
    },
    idade:{
      type:'date',
      value:'',
      haveError:true,
      whatError: ''
    },
    email:{
      type:'email',
      value:'',
      haveError:true,
      whatError: ''
    },
    palavrapasse:{
      type:'password',
      value:'',
      haveError:true,
      whatError: ''
    },
    palavrapasseConfirm:{
      type:'password',
      value:'',
      haveError:true,
      whatError: ''
    }
  },
  questionario:[],
  incomplete_question:{
    index: null,
    message:''
  }
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
    case 'show_error_fetch':
      return {
        ...state,
        personalInfo:{
          ...state.personalInfo,
          [action.name]:{
            ...state.personalInfo[action.name],
            whatError:'Por favor, preencha o dado(s) antes de finalizar o questionario'
          }
        }
      }
    case 'incomplete_question':
      return{
        ...state,
        incomplete_question: {
          index: action.index,
          message: action.message
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
    for(const element in state.personalInfo) {
      if(state.personalInfo[element].haveError){
        document.getElementsByName(element)[0].scrollIntoView({block:'center', behavior:'smooth'})
        dispatch({type:'show_error_fetch', name:element});
        break
      }
    }
    if(state.questionario.includes(undefined)){
      const location = state.questionario.findIndex((element) => element === undefined)
      const div = document.getElementsByName(`pergunta${location}`)[0]
      div.scrollIntoView({block:'center', behavior:'smooth'})
      dispatch({type:'incomplete_question', index:location ,message:'Por favor preencha todas as perguntas'})
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