import { useContext } from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';

import {LoginContext} from '../../App';

import {ReactComponent as Logo} from '../../assets/Logo3.1.svg';
import TextInput from '../../util/TextInput/TextInput';
import {ErrorMessage} from '../../util/ErrorHandler/ErrorHandler';

import classes from './Login.module.scss';

const Login = () => {

  const [state, dispatch] = useContext(LoginContext)


  const closeLogin = () => {
    return dispatch({type:'toogle_login', boolean:false, text:''})
  }
  

  return ReactDOM.createPortal(
    <>
    {state.login.show 
      &&
    <div id='login'>
      <div className={classes.Background} onClick={() => {closeLogin()}}/>
      <div className={classes.box}>
        <div className={classes.CloseIcon} onClick={() => {closeLogin()}}/>
        <Logo className={classes.Logo}></Logo>
        <div className={classes.line}></div>
        {state.login.preMessage && 
        <ErrorMessage 
          errorMessage={state.login.preMessage} 
          style={{backgroundColor:'#26B44E', color:'#fff', margin:'10px auto'}}
        />}
        <TextInput 
          className={classes.TextInputTop}
          type='email'
          defaultValue='Email'
          ></TextInput>
        <TextInput 
          className={classes.TextInputBottom}
          type='password'
          defaultValue='Password'
        ></TextInput>
        <button className={classes.loginButton}>Login</button>
        <p className={classes.Description}>
          Se não tem conta faça primeiro o nosso questionario 
          <Link className={classes.Link} to='/questionario' onClick={() => {closeLogin()}}>aqui</Link>.
        </p>
      </div>
    </div>
    }
    </>
    , document.body)
}

export default Login;