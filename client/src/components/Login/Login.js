import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';

import {ReactComponent as Logo} from '../../assets/Logo3.1.svg';
import TextInput from '../../util/TextInput/TextInput';

import classes from './Login.module.scss';

const Login = (props) => {

  useEffect(() => {
    if(props.login) document.body.style.overflow = 'hidden'
  },[props.login])

  if(!props.login) return null;

  return ReactDOM.createPortal(
    <div id='login'>
      <div className={classes.box}>
        <Logo className={classes.Logo}></Logo>
        <div className={classes.line}></div>
        <TextInput 
          classContainer={classes.ContainerText} 
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
        <p className={classes.Description}>Se não tem conta faça primeiro o nosso questionario <Link className={classes.Link} to='/questionario'>aqui</Link>.</p>
      </div>
    </div>
    , document.body)
}

export default Login;