import { useContext, useReducer, useState } from 'react';
import ReactDOM from 'react-dom';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';

import {LoginContext} from '../../App';

import {ReactComponent as Logo} from '../../assets/Logo3.1.svg';
import TextInput from '../../util/TextInput/TextInput';
import {ErrorMessage} from '../../util/ErrorHandler/ErrorHandler';
import {ReactComponent as Loading} from '../../assets/Loading.svg'

import classes from './Login.module.scss';

const initialState = {
  email:{
    type:'email',
    value:'',
  },
  palavrapasse:{
    type:'password',
    value:'',
  },
  handler:{
    loading:false,
    whatError:''
  }
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'put_value':
      return {
        ...state,
        [action.name]:{
          ...state[action.name],
          value: action.value
        }
      }
    case 'handler':
      return {
        ...state,
        handler: {
          loading:action.boolean,
          whatError:action.message
        }
      }
    default:
      return;
    }
}

// serve para cancelar o request post do login 
// API CancelToken
const source = axios.CancelToken.source();

const Login = () => {

  const [loginState, loginDispatch] = useContext(LoginContext)
  const history = useHistory()

  const [state, dispatch] = useReducer(reducer, initialState);

  const closeLogin = () => {
    // cancela o request post quando fecha se o login
    source.cancel();
    dispatch({type:'handler',boolean:false, message: '',})
    return loginDispatch({type:'toogle_login', boolean:false})
  }

  const fetch = () => {
    dispatch({type:'handler',boolean:true, message: ''})

    axios.post(
      'http://95.93.159.118:8888/user/login',
      {
        email:state.email.value,
        palavrapasse:state.palavrapasse.value,
      },{
        // serve para cancelar o request post do login 
        cancelToken: source.token,
      }
    ).then((response) => {
      if(response.data.status !== 200) {
        dispatch({type:'handler', boolean:false ,message: response.data.message})
      }
      if(response.data.status === 200) {
        const {data} = response
        // envia o id e o token para o state
        loginDispatch({type:'send_token', id: data.id, token: data.token})
        // retira o loading svg
        dispatch({type:'handler', boolean:false ,message: ''})
        // fecha o login model
        loginDispatch({type:'toogle_login', boolean:false})
        history.push(loginState.login.path)
      }
      
    }).catch((error) =>{
      if(axios.isCancel(error)){
        return null
      }
      dispatch({type:'handler', boolean:false ,message: 'Erro interno, por favor tente mais tarde'})
    })
  }

  return ReactDOM.createPortal(
    <>
    {loginState.login.show 
      &&
    <div id='login'>
      <div className={classes.Background} onClick={() => {closeLogin()}}/>
      <div className={classes.box}>
        <div className={classes.CloseIcon} onClick={() => {closeLogin()}}/>
        <Logo className={classes.Logo}/>
        <div className={classes.line}/>
        {(state.handler.whatError || loginState.login.preMessage) &&
        <ErrorMessage 
          errorMessage={state.handler.whatError || loginState.login.preMessage}
          style={{margin:'10px auto'}}
        />}
        <TextInput 
          className={classes.TextInputTop}
          type={state.email.type}
          name='email'
          defaultValue='Email'
          onChange={(event) => dispatch({type:'put_value', name:event.target.name, value:event.target.value})}
          onKeyPress={(event) => {event.key === 'Enter' && fetch()}}
          ></TextInput>
        <TextInput 
          className={classes.TextInputBottom}
          type={state.palavrapasse.type}
          name='palavrapasse'
          defaultValue='Password'
          onChange={(event) => dispatch({type:'put_value', name:event.target.name, value:event.target.value})}
          onKeyPress={(event) => {event.key === 'Enter' && fetch()}}
        ></TextInput>
        {state.handler.loading ? <Loading className={classes.loading}></Loading> : <button className={classes.loginButton} onClick={fetch}>Login</button>}
        <p className={classes.Description}>
          Se não tem conta faça primeiro o nosso questionario 
          <Link className={classes.Link} to='/questionario' onClick={() => {closeLogin()}}> aqui</Link>.
        </p>
      </div>
    </div>
    }
    </>
    , document.body)
}

export default Login;