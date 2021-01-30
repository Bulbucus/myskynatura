import {useReducer, useState, createContext} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

import classes from './Questionario.module.scss';

import {checkValue, checkPassword} from '../../util/Validation/checkValue'
import {ReactComponent as Loading} from '../../assets/Loading.svg'

import PersonalInfo from './PersonalInfo/PersonalInfo';
import Perguntas from './Perguntas/Perguntas';
import Registo from './Registo/Registo';

const QuestionarioContext = createContext();

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
      type:'select',
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
            whatError:action.message
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

  const [state, dispatch] = useReducer(reducer,initialState);

  const [loading, setLoading] = useState(false);
  console.log(state)
  let history = useHistory();

  // criei um handler que melhora a experiencia no user se faltar algum dado,
  // antes de enviar os dados para o back end, melhorando assim a rapidez de respostas
  // e envitando mais requests para o back end.
  const fetch = () => {

    let noError = true;
    // faz scroll na pagina e mostra ao user qual o input que falta preencher
    for(const element in state.personalInfo) {
      if(state.personalInfo[element].haveError){
        console.log(element)
        console.log(document.getElementsByName(element)[0])
        console.log(document.getElementById(element))
        let getElement = document.getElementsByName(element)[0] || document.getElementById(element)
        getElement.scrollIntoView({block:'center', behavior:'smooth'})
        dispatch({type:'show_error_fetch', name:element, message:'Por favor, preencha o dado(s) corretamente antes de finalizar o questionario'});
        noError = false;
        break
      }
    }

    // faz scroll nas perguntas e mostra ao user que falta preencher com uma mensagem
    if(state.questionario.includes(undefined) || (state.questionario.findIndex(el => el.length === 0) > -1)){
      let location
      // o state.questionario pode ser composto por strings ou arrays de strings:
      // ['string', ['string', 'string'] ]
      // esta logica a baixo serve so para procurar qual das strings ou as arrays de strings esta sem valor
      state.questionario.findIndex((element) => element === undefined) === -1 ? 
      location = state.questionario.findIndex(el => el.length === 0) 
      :
      location = state.questionario.findIndex((element) => element === undefined)

      const div = document.getElementsByName(`pergunta${location}`)[0]
      div.scrollIntoView({block:'center', behavior:'smooth'})
      dispatch({type:'incomplete_question', index:location ,message:'Por favor preencha todas as perguntas'})
      noError = false;
    }

    if(noError){
      setLoading(true)
      const value = name  => state.personalInfo[name].value
      axios.post(
        'http://95.93.159.118:8888/user/registar',
        {
          primeiro_nome: value('primeiro_nome'),
          ultimo_nome: value('ultimo_nome'),
          genero: value('genero'),
          idade: value('idade'),
          email: value('email'),
          palavrapasse: value('palavrapasse'),
          // transforma questionario (['value1', ['value2','value3'], ['value4','value5']])
          // para isto (['value1', 'value2', value3', 'value4', 'value5'])
          questionario: [].concat.apply([],state.questionario)
        }
      ).then(
        (response) => {
          if(response.data.status !== 200) {
            setLoading(false)
            dispatch({type:'show_error_fetch', name:'email', message:response.data.message})
          }
          if(response.data.status === 200) {
            setLoading(false)
            history.push('/')
            console.log(response.data)
          }
          
        }
      ).catch(() => {
        setLoading(false)
        dispatch({type:'show_error_fetch', name:'email', message:'Erro interno. Por favor tente mais tarde'})
      })
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
      {loading ? <Loading className={classes.loading}></Loading> : <button className={classes.button} onClick={fetch}>Acabar o questionário</button>}
    </QuestionarioContext.Provider>
  )
}

export {Questionario , QuestionarioContext};