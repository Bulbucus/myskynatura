import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {useHistory} from "react-router-dom";

import {connect } from 'react-redux';
import actions from '../../redux/actions';

import {ReactComponent as Logo } from '../../images/Logo3.1.svg';
import {ReactComponent as CloseIcon } from '../../images/closeIcon.svg';


import classes from './Autenc.module.css'


const Login = (props) => {

  // states
  const history = useHistory();

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
        history.push('/resultado');
      }
    })
  }
  console.log(props.login)
  //render
  const children = (
    <>
      <div className={classes.contentor}>
        <CloseIcon className={classes.icon} onClick={() => props.toogleLoginModel("/")}></CloseIcon>
        <div className={classes.logoContentor}>
          <Logo></Logo>
        </div>
        <form id='autenc' className={classes.form} onSubmit={(event) => submitHandler(event)}>
          <span>{props.login.preMessageLogin}</span>
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
      <div className={classes.fundoEscuro} onClick={() => props.toogleLoginModel("/")}>
      </div>
      </>  
  )


  return ReactDOM.createPortal(children,document.getElementById('modal'))
}

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toogleLoginModel: (urlLogin) => dispatch(actions.toogleLoginModel(urlLogin))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);
