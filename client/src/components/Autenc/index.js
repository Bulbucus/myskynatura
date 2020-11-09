import ReactDOM from 'react-dom';
import {ReactComponent as Logo } from '../../images/Logo3.1.svg';
import {ReactComponent as CloseIcon } from '../../images/closeIcon.svg';
import classes from './Autenc.module.css'

const Autenc = (props) => {

  const {closeModal, type} = props

  const submitHandler = (event) => {
    event.preventDefault()
  
  }

  const children = (
    <>
      <div className={classes.contentor}>
        <CloseIcon className={classes.icon} onClick={closeModal}></CloseIcon>
        <div className={classes.logoContentor}>
          <Logo></Logo>
        </div>
        {type === 'login' && 
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
        }
      </div>
      <div className={classes.fundoEscuro} onClick={closeModal}>
      </div>
      </>  
  )

  return ReactDOM.createPortal(children,document.getElementById('modal'))
}

export default Autenc;