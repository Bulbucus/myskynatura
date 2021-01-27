import { useCallback, useContext} from 'react';
import { QuestionarioContext } from '../Questionario';

import classes from './PersonalInfo.module.scss';

import TextInput from '../../../util/TextInput/TextInput';
import {SelectInput, DefaultMessage, Options, Option} from '../../../util/SelectInput/SelectInput';
import DateInput from '../../../util/DateInput/DateInput';
import Validation from '../../../util/ErrorMessage/Validation';

const PersonalInfo = () => {

  const [state, dispatch] = useContext(QuestionarioContext)

  const dispatchValue = (data) => {
    dispatch({type:'put_value_personalInfo', name: data.name , value: data.value})
  }

  const dispatchError = (boolean, name) => {
    dispatch({type:'toogle_error', boolean:boolean, name: name})
  }

  return (
    <div className={classes.container}>
      <p className={classes.title}>Antes de começar o questionário, diga-nos o seu nome, género e idade:</p>
      <p className={classes.LittleInfo}>(preencher corretamente para um melhor resultado)</p>
      <div className={classes.containerTextInput}>
        <Validation value={state.personalInfo.primeiro_nome.value} error={(boolean, name) => dispatchError(boolean, name)}>
            <TextInput type='text' defaultValue='Primeiro Nome' name='primeiro_nome' onChange={(event) => dispatchValue(event.target)}/>
        </Validation>
        </div>
        <div className={classes.containerTextInput}>
        <Validation value={state.personalInfo.ultimo_nome.value} error={(boolean, name) => dispatchError(boolean, name)}>
          <TextInput type='text' defaultValue='Ultimo Nome' name='ultimo_nome' onChange={(event) => dispatchValue(event.target)}/>
        </Validation>
        </div>
      <div className={classes.Select}>
      <Validation value={state.personalInfo.genero.value} error={(boolean, name) => dispatchError(boolean, name)}>
        <SelectInput type='text' name='genero' onClick={(event) => {event.target.dataset.name && dispatchValue(event.target.dataset)}}>
          <DefaultMessage defaultValue='Género'/>
          <Options>
            <Option value='Masculino'>Masculino</Option>
            <Option value='Feminino'>Feminino</Option>
          </Options>
        </SelectInput>
        </Validation>
      </div>
      <div className={classes.TitleDate}>Aniversario</div>
      <div className={classes.container_date}>
      <Validation value={state.personalInfo.idade.value} error={(boolean, name) => dispatch({type:'toogle_error', boolean:boolean, name: name})}>
        <DateInput type='date' name='idade' value={useCallback((value) => dispatch({type:'put_value_personalInfo', name:'idade', value:value}),[dispatch])}></DateInput >
      </Validation>
      </div>
    </div>
  )
}

export default PersonalInfo;