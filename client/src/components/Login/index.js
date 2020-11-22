import ReactDOM from 'react-dom';
import {useHistory} from "react-router-dom";
import {ReactComponent as Logo } from '../../images/Logo3.1.svg';
import {ReactComponent as CloseIcon } from '../../images/closeIcon.svg';
import classes from './Autenc.module.css'
import { useEffect, useState } from 'react';

const Login = (props) => {
  // props
  const {closeModal, preMessage} = props

  // states
  const history = useHistory();
  const [textPreMessage, setTextPreMessage] = useState('')

  // submit handler
  const submitHandler = (event) => {
    event.preventDefault()
    fetch('http://localhost:8888/user/login', {
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      referrerPolicy: 'no-referrer',
      credentials: 'include',
      body: JSON.stringify({
        email:event.target.email.value,
        palavrapasse:event.target.password.value
      })
    }).then(data => data.json()).then(respond => {
      if(respond.id && respond.email){
        closeModal();
        history.push('/resultado');
      }
    })
  }

  // useEffect
  useEffect(() => {
    if (preMessage) {
        if (preMessage === 'registoSucesso') {
          setTextPreMessage('Registo com sucesso, por favor faça o login');
        }
    }
  },[preMessage])

  //render
  const children = (
    <>
      <span>{preMessage && textPreMessage}</span>
      <div className={classes.contentor}>
        <CloseIcon className={classes.icon} onClick={closeModal}></CloseIcon>
        <div className={classes.logoContentor}>
          <Logo></Logo>
        </div>
        <form id='autenc' className={classes.form} onSubmit={(event) => submitHandler(event)}>
          <label>
            Email:
          </label>
            <input type='email' name='email' className={classes.email}/>
          <label>
            Password:
          </label>
          <input type='password' name='password' className={classes.password}></input>
          <input type='submit' className={classes.submit} value='Login'/>
        </form>
      </div>
      <div className={classes.fundoEscuro} onClick={closeModal}>
      </div>
      </>  
  )

  return ReactDOM.createPortal(children,document.getElementById('modal'))
}

export default Login;