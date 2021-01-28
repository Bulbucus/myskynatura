import { useCallback, useContext} from 'react';
import { QuestionarioContext } from '../Questionario';

import classes from './PersonalInfo.module.scss';

import TextInput from '../../../util/TextInput/TextInput';
import {SelectInput, DefaultMessage, Options, Option} from '../../../util/SelectInput/SelectInput';
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
          type={state.personalInfo.genero.type}
          name='genero' 
          // coloquei if event.target.dataset.name se nao cria undefined no context
          onClick={(event) => {event.target.dataset.name && dispatchValue(event.target.dataset)}}
        >
          <DefaultMessage 
          defaultValue='Género' 
          />
          <Options>
            <Option value='Masculino'>Masculino</Option>
            <Option value='Feminino'>Feminino</Option>
          </Options>
        </SelectInput>
        <ErrorIcon error={state.personalInfo.genero.haveError}/>
      </div>
      <div className={classes.TitleDate}>Aniversario</div>
      <ErrorMessage errorMessage={state.personalInfo.idade.whatError}/>
      <div className={classes.container_date}>
        <DateInput 
          type={state.personalInfo.idade.type}
          name='idade' 
          // precisa de useCallback pois o props.value encontra se dentro de useEffect, assim cada vez
          // que user muda a data o context recebe no mesmo ciclo
          value={useCallback((value) => dispatch({type:'put_value_personalInfo',input:'date' ,name:'idade', value:value}),[dispatch])}></DateInput >
      <ErrorIcon error={state.personalInfo.idade.haveError}/>
      </div>
    </div>
  )
}

export default PersonalInfo;