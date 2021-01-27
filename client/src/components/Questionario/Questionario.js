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
      haveError:true
    },
    ultimo_nome:{
      value:'',
      haveError:true
    },
    genero:{
      value:'',
      haveError:true
    },
    idade:{
      value:'',
      haveError:true
    },
    email:{
      value:'',
      haveError:true,
    },
    palavrapasse:{
      value:'',
      haveError:true,
    },
    palavrapasseConfirm:{
      value:'',
      haveError:true
    }
  },
  questionario:[],
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'put_value_personalInfo':
      return {
        ...state,
        personalInfo:{
          ...state.personalInfo,
          [action.name]:{
            ...state.personalInfo[action.name],
            value: action.value
          }
        }
      }
    case 'put_value_questionario':
      return{
        ...state,
        questionario:action.array
      }
    case 'toogle_error':
      return {
        ...state,
        personalInfo:{
          ...state.personalInfo,
          [action.name]:{
            ...state.personalInfo[action.name],
            haveError:action.boolean
          }
        }
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