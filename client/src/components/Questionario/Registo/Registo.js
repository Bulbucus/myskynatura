import {useContext} from 'react';
import {QuestionarioContext} from '../Questionario';
import classes from './Registo.module.scss';

import TextInput from '../../../util/TextInput/TextInput'
import Validation from '../../../util/ErrorMessage/Validation'

const Registo = () => {

  const [state, dispatch] = useContext(QuestionarioContext)

  const dispatchValue = (event) => {
    dispatch({type:'put_value_personalInfo', name:event.target.name , value:event.target.value})
  }

  const dispatchError = (boolean, name) => {
    dispatch({type:'toogle_error', boolean:boolean, name: name})
  }

  return (
    <div className={classes.container}>
      <p className={classes.title}>Para acabar o questionário precisa de criar uma conta no nosso site:</p>
      <div className={classes.containerTextInput}>
      <Validation value={state.personalInfo.email.value} error={(boolean, name) => dispatchError(boolean, name)}>
        <TextInput type='email' defaultValue="Email" name='email' onChange={(event) => dispatchValue(event)}/>
      </Validation>
      </div>
      <div className={classes.containerTextInput}>
      <Validation value={state.personalInfo.palavrapasse.value} error={(boolean, name) => dispatchError(boolean, name)}>
        <TextInput type='password' defaultValue="Password" name='palavrapasse' onChange={(event) => dispatchValue(event)}/>
      </Validation>
      </div>
      <div className={classes.containerTextInput}>
      <Validation confirmPassword={true} value={state.personalInfo.palavrapasseConfirm.value} password={state.personalInfo.palavrapasse.value} error={(boolean, name) => dispatchError(boolean, name)}>
        <TextInput type='password' defaultValue="Confirmar Password" name='palavrapasseConfirm' onChange={(event) => dispatchValue(event)}/>
      </Validation>
      </div>
    </div>
  )

}

export default Registo;