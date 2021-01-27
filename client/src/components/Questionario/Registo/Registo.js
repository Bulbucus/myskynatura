import {useContext} from 'react';
import {QuestionarioContext} from '../Questionario';
import classes from './Registo.module.scss';

import TextInput from '../../../util/TextInput/TextInput'
import {ErrorMessage, ErrorIcon} from '../../../util/ErrorHandler/ErrorHandler';

const Registo = () => {

  const [state, dispatch] = useContext(QuestionarioContext)

  const dispatchValue = (data) => {
    dispatch({type:'put_value_personalInfo', input: data.type, name:data.name , value:data.value})
  }

  const dispatchConfirmPassword = (data) => {
    dispatch({type:'confirm_password', value:data.value, passwordValue:state.personalInfo.palavrapasse.value})
  }

  return (
    <div className={classes.container}>
      <p className={classes.title}>Para acabar o questionário precisa de criar uma conta no nosso site:</p>
      <div className={classes.containerTextInput}>
        <ErrorMessage errorMessage={state.personalInfo.email.whatError}/>
        <TextInput type='email' defaultValue="Email" name='email' onChange={(event) => dispatchValue(event.target)}/>
        <ErrorIcon error={state.personalInfo.email.haveError}/>
      </div>
      <div className={classes.containerTextInput}>
        <ErrorMessage errorMessage={state.personalInfo.palavrapasse.whatError}/>
        <TextInput type='password' defaultValue="Password" name='palavrapasse' onChange={(event) => dispatchValue(event.target)}/>
        <ErrorIcon error={state.personalInfo.palavrapasse.haveError}/>
      </div>
      <div className={classes.containerTextInput}>
        <ErrorMessage errorMessage={state.personalInfo.palavrapasseConfirm.whatError}/>
        <TextInput type='password' defaultValue="Confirmar Password" name='palavrapasseConfirm' onChange={(event) => dispatchConfirmPassword(event.target)}/>
        <ErrorIcon error={state.personalInfo.palavrapasseConfirm.haveError}/>
      </div>
    </div>
  )

}

export default Registo;