import {useEffect, useReducer, useCallback, useContext, useState} from 'react';
import axios from 'axios';

import { LoginContext } from '../../../App';

import classes from './Dados.module.scss';

import {checkValue} from '../../../util/Validation/checkValue'
import {ErrorMessage, ErrorIcon} from '../../../util/ErrorHandler/ErrorHandler';
import {ReactComponent as Loading} from '../../../assets/Loading.svg';

import TextInput from '../../../util/TextInput/TextInput';
import {SelectInput, Options} from '../../../util/SelectInput/SelectInput';
import DateInput from '../../../util/DateInput/DateInput';

import checkEnv from '../../../production/checkEnv';

const initialState = {
  personalInfo:{
    primeiro_nome:{
      type: 'text',
      value:'',
      haveError:true,
      whatError: ''
    },
    ultimo_nome:{
      type: 'text',
      value:'',
      haveError:true,
      whatError: ''
    },
    genero:{
      type: 'select',
      value:'',
      haveError:true,
      whatError: ''
    },
    idade:{
      type: 'date',
      value:'',
      haveError:true,
      whatError: ''
    },
  },
  update:{
    error: false,
    message:''
  }
}


const reducer = (state, action) => {
  switch (action.type) {
    case 'put_value_personalInfo':
      const checkedValue = checkValue(state.personalInfo[action.name].type, action.value)
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
      case 'message_update':{
        return {
          ...state,
          update:{
            error: action.error || false,
            message: action.message
          }
        }
      }
      default:
        break
    }
}
  

const Dados = () => {

  const [state, dispatch] = useReducer(reducer,initialState)
  const [loginState] = useContext(LoginContext)

  const [loading, setLoading] = useState(false)

  const dispatchValue = (data) => {
    dispatch({type:'message_update', message:''})
    dispatch({type:'put_value_personalInfo',name: data.name , value: data.value})
  }
  
  useEffect(() => {
    axios.post(`${checkEnv()}/api/user/getUser`,{
      token: loginState.user.token,
      id: loginState.user.id
    }).then((response) => {
      if(response.status === 200) {
        for( const element in response.data){
          dispatch({type:'put_value_personalInfo', name: element, value:response.data[element]})
        }
      }
    })
  },[loginState.user.id, loginState.user.token])

  const updateUser = () => {

    let noError = true;
    // faz scroll na pagina e mostra ao user qual o input que falta preencher ou tem erro
    for(const element in state.personalInfo) {
      if(state.personalInfo[element].haveError){
        let getElement = document.getElementsByName(element)[0] || document.getElementById(element)
        getElement.scrollIntoView({block:'center', behavior:'smooth'})
        dispatch({type:'show_error_fetch', name:element, message:'Por favor, preencha o dado(s) corretamente antes de finalizar o questionario'});
        noError = false;
        break
      }
    }

    if(noError){
      setLoading(true)
      const value = name  => state.personalInfo[name].value
    axios.post(`${checkEnv()}/api/user/updateUser`,{
      token: loginState.user.token,
      id: loginState.user.id,
      primeiro_nome: value('primeiro_nome'),
      ultimo_nome: value('ultimo_nome'),
      genero: value('genero'),
      idade: value('idade'),
    }).then((response) => {
      if(response.data.status === 200) {
        setLoading(false)
        dispatch({type:'message_update', message:'Ediçao de dados feita com sucesso!'})
      }
    }).catch((error) => {
      setLoading(false)
      dispatch({type:'message_update', error: true, message:'Error interno, por favor tente mais tarde!'})
    })
  }}

    return (
      <>
        <div>
          <button className={classes.Title}>Meus Dados</button>
          <div className={classes.box}>
            <p className={classes.Description}>Primeiro Nome</p>
            <div className={classes.containerTextInput}>
              <ErrorMessage errorMessage={state.personalInfo.primeiro_nome.whatError}/>
              <TextInput 
                name='primeiro_nome' 
                value={state.personalInfo.primeiro_nome.value} 
                defaultValue='Espera por favor ...'
                onChange={(event) => dispatchValue(event.target)}
              />
              <ErrorIcon error={state.personalInfo.primeiro_nome.haveError}/>
            </div>
            <p className={classes.Description}>Ultimo Nome</p>
            <div className={classes.containerTextInput}>
              <ErrorMessage errorMessage={state.personalInfo.ultimo_nome.whatError}/>
              <TextInput 
                name='ultimo_nome'
                value={state.personalInfo.ultimo_nome.value} 
                defaultValue='Espera por favor ...'
                onChange={(event) => dispatchValue(event.target)}
              />
              <ErrorIcon error={state.personalInfo.ultimo_nome.haveError}/>
            </div>
            <p className={classes.Description}>Género</p>
            <ErrorMessage errorMessage={state.personalInfo.genero.whatError}/>
            <div className={classes.Select}>
              <SelectInput 
                placeholder='Espera por favor ...' 
                name='genero' 
                value={state.personalInfo.genero.value}>
                <Options 
                  options={['Masculino', 'Feminino']} 
                  onClick={(value) => {
                      dispatch({type:'put_value_personalInfo', input:'select', name:'genero' ,value:value})
                      dispatch({type:'message_update', message:''})
                  }}
                />
              </SelectInput>
              <ErrorIcon error={state.personalInfo.genero.haveError}/>
            </div>
            <p className={classes.TitleDate}>Aniversario</p>
            <ErrorMessage errorMessage={state.personalInfo.idade.whatError}/>
            <DateInput
                name='idade' 
                date={state.personalInfo.idade.value}
                value={useCallback((value) => {
                  dispatch({type:'put_value_personalInfo', input:'date', name:'idade',value:value})
                  dispatch({type:'message_update', message:''})
                },[dispatch])}
              />
              <ErrorIcon error={state.personalInfo.idade.haveError}/>
            <div className={classes.separador}></div>
            <ErrorMessage style={!state.update.error ? {backgroundColor:'#26B44E', margin:'15px auto'} : {margin:'15px auto'}} errorMessage={state.update.message}/>
            {loading ? <Loading className={classes.loading}></Loading> :<button className={classes.button} onClick={() => {updateUser()}}>Editar dados</button>}
          </div>
        </div>
      </>
    )
}
  
export default Dados;