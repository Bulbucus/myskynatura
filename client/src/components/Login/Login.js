import ReactDOM from 'react-dom';

import {ReactComponent as Logo} from '../../assets/Logo3.1.svg'

import classes from './Login.module.scss';

const Login = (props) => {



  if(!props.login) return null;

  return ReactDOM.createPortal(
    <div id='login' onClick={props.login}>
      <div>
        <Logo></Logo>
        <div className={classes.line}></div>

      </div>
    </div>
    , document.body)
}

export default Login;