import { useCallback, useContext} from 'react';
import { QuestionarioContext } from '../Questionario';

import classes from './PersonalInfo.module.scss';

import TextInput from '../../../util/TextInput/TextInput';
import {SelectInput, Options} from '../../../util/SelectInput/SelectInput';
import DateInput from '../../../util/DateInput/DateInput';
import {ErrorMessage, ErrorIcon} from '../../../util/ErrorHandler/ErrorHandler';


const PersonalInfo = () => {

  const [state, dispatch] = useContext(QuestionarioContext)

  const dispatchValue = (data) => {
    dispatch({type:'put_value_personalInfo', input: data.type, name: data.name , value: data.value})
  }

  return (
    <div className={classes.container}>
      <p className={classes.title}>Antes de começar o questionário, diga-nos o seu nome, género e idade:</p>
      <p className={classes.LittleInfo}>(preencher corretamente para um melhor resultado)</p>
      <div className={classes.containerTextInput}>
        <ErrorMessage errorMessage={state.personalInfo.primeiro_nome.whatError}/>
        <TextInput 
          type={state.personalInfo.primeiro_nome.type} 
          defaultValue='Primeiro Nome' 
          name='primeiro_nome' 
          value={state.personalInfo.primeiro_nome.value} 
          onChange={(event) => {dispatchValue(event.target)}}
        />
        <ErrorIcon error={state.personalInfo.primeiro_nome.haveError}/>
      </div>
        <div className={classes.containerTextInput}>
          <ErrorMessage errorMessage={state.personalInfo.ultimo_nome.whatError}/>
          <TextInput 
            type={state.personalInfo.ultimo_nome.type} 
            defaultValue='Ultimo Nome' 
            name='ultimo_nome'  
            value={state.personalInfo.ultimo_nome.value}
            onChange={(event) => dispatchValue(event.target)}
          />
          <ErrorIcon error={state.personalInfo.ultimo_nome.haveError}/>
        </div>
        <ErrorMessage errorMessage={state.personalInfo.genero.whatError}/>
        <div className={classes.Select}>
          <SelectInput 
            placeholder='Genero' 
            name='genero' 
            value={state.personalInfo.genero.value}>
            <Options 
              options={['Masculino', 'Feminino']} 
              onClick={(value) => {dispatch({type:'put_value_personalInfo', input:'select', name:'genero' ,value:value})}}
            />
          </SelectInput>
          <ErrorIcon error={state.personalInfo.genero.haveError}/>
      </div>
      <div className={classes.TitleDate}>Aniversario</div>
      <ErrorMessage errorMessage={state.personalInfo.idade.whatError}/>
      <div className={classes.container_date}>
        <DateInput
          name='idade' 
          value={useCallback((value) => {dispatch({type:'put_value_personalInfo', input:'date', name:'idade',value:value})},[dispatch])}
        />
        <ErrorIcon error={state.personalInfo.idade.haveError}/>
      </div>
    </div>
  )
}

export default PersonalInfo;