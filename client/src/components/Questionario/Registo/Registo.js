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

  const dispatchPassword = (data) => {
    dispatch({type:'put_value_password', input: data.type, name:data.name , value:data.value})
  }

  const dispatchConfirmPassword = (data) => {
    dispatch({type:'confirm_password', value:data.value, passwordValue:state.personalInfo.palavrapasse.value})
  }

  return (
    <div className={classes.container}>
      <p className={classes.title}>Para acabar o questionário precisa de criar uma conta no nosso site:</p>
      <div className={classes.containerTextInput}>
        <ErrorMessage errorMessage={state.personalInfo.email.whatError}/>
        <TextInput 
          type={state.personalInfo.email.type} 
          value={state.personalInfo.email.value}
          defaultValue="Email" 
          name='email' 
          onChange={(event) => dispatchValue(event.target)}/>
        <ErrorIcon error={state.personalInfo.email.haveError}/>
      </div>
      <div className={classes.containerTextInput}>
        <ErrorMessage errorMessage={state.personalInfo.palavrapasse.whatError}/>
        <TextInput 
          type={state.personalInfo.palavrapasse.type} 
          value={state.personalInfo.palavrapasse.value}
          defaultValue="Password" 
          name='palavrapasse' 
          onChange={(event) => dispatchPassword(event.target)}/>
        <ErrorIcon error={state.personalInfo.palavrapasse.haveError}/>
      </div>
      <div className={classes.containerTextInput}>
        <ErrorMessage errorMessage={state.personalInfo.palavrapasseConfirm.whatError}/>
        <TextInput 
          type={state.personalInfo.palavrapasseConfirm.type}
          value={state.personalInfo.palavrapasseConfirm.value}
          defaultValue="Confirmar Password" 
          name='palavrapasseConfirm' 
          onChange={(event) => dispatchConfirmPassword(event.target)}/>
        <ErrorIcon error={state.personalInfo.palavrapasseConfirm.haveError}/>
      </div>
    </div>
  )

}

export default Registo;