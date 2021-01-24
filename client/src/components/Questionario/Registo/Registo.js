import {createContext, useReducer, useEffect} from 'react';
import classes from './Registo.module.scss';

import TextInput from '../../../util/TextInput/TextInput'
import Validation from '../../../util/ErrorMessage/Validation'

const initialState ={
  email:{
    value:'',
    haveError:true,
  },
  password:{
    value:'',
    haveError:true,
  },
  confirmPassword:{
    value:'',
    haveError:true
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
    case 'toogle_error':
      return {
        ...state,
        [action.name]:{
          ...state[action.name],
          haveError:action.boolean
        }
      }
    default:
      break;
  }
}

const Registo = (props) => {

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    props.form(state)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[state])

  return (
    <div className={classes.container}>
      <p className={classes.title}>Para acabar o questionário precisa de criar uma conta no nosso site:</p>
      <div className={classes.containerTextInput}>
      <Validation value={state.email.value} error={(boolean, name) => dispatch({type:'toogle_error', boolean:boolean, name: name})}>
        <TextInput type='email' defaultValue="Email" name='email' onChange={(event) => {dispatch({type:'put_value', name:event.target.name , value:event.target.value})}}/>
      </Validation>
      </div>
      <div className={classes.containerTextInput}>
      <Validation value={state.password.value} error={(boolean, name) => dispatch({type:'toogle_error', boolean:boolean, name: name})}>
        <TextInput type='password' defaultValue="Password" name='password' onChange={(event) => {dispatch({type:'put_value', name:event.target.name , value:event.target.value})}}/>
      </Validation>
      </div>
      <div className={classes.containerTextInput}>
      <Validation confirmPassword={state.confirmPassword.value} password={state.password.value} error={(boolean, name) => dispatch({type:'toogle_error', boolean:boolean, name: name})}>
        <TextInput type='password' defaultValue="Confirmar Password" name='confirmPassword' onChange={(event) => {dispatch({type:'put_value', name:event.target.name , value:event.target.value})}}/>
      </Validation>
      </div>
    </div>
  )

}

export default Registo;