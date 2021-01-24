import { createContext, useEffect, useReducer } from 'react';

import classes from './PersonalInfo.module.scss';

import TextInput from '../../../util/TextInput/TextInput';
import {SelectInput, DefaultMessage, Options, Option} from '../../../util/SelectInput/SelectInput';
import DateInput from '../../../util/DateInput/DateInput';
import Validation from '../../../util/ErrorMessage/Validation';

const initialState = {
    primeiroNome:{
      value:'',
      haveError:true
    },
    ultimoNome:{
      value:'',
      haveError:true
    },
    genero:{
      value:'',
      haveError:true
    },
    birth:{
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

const PersonalInfo = (props) => {

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    props.form(state)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[state])

  return (
    <div className={classes.container}>
      <p className={classes.title}>Antes de começar o questionário, diga-nos o seu nome, género e idade:</p>
      <p className={classes.LittleInfo}>(preencher corretamente para um melhor resultado)</p>
      <div className={classes.containerTextInput}>
        <Validation value={state.primeiroNome.value} error={(boolean, name) => dispatch({type:'toogle_error', boolean:boolean, name: name})}>
            <TextInput type='text' defaultValue='Primeiro Nome' name='primeiroNome' onChange={(event) => {dispatch({type:'put_value', name:event.target.name , value:event.target.value})}}/>
        </Validation>
        </div>
        <div className={classes.containerTextInput}>
        <Validation value={state.ultimoNome.value} error={(boolean, name) => dispatch({type:'toogle_error', boolean:boolean, name: name})}>
          <TextInput type='text' defaultValue='Ultimo Nome' name='ultimoNome' onChange={(event) => {dispatch({type:'put_value', name:event.target.name , value:event.target.value})}}/>
        </Validation>
        </div>
      <div className={classes.Select}>
      <Validation value={state.genero.value} error={(boolean, name) => dispatch({type:'toogle_error', boolean:boolean, name: name})}>
        <SelectInput type='text' name='genero' onClick={(event) => {event.target.dataset.name && dispatch({type:'put_value', name:event.target.dataset.name , value:event.target.dataset.value})}}>
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
      <Validation value={state.birth.value} error={(boolean, name) => dispatch({type:'toogle_error', boolean:boolean, name: name})}>
        <DateInput type='date' name='birth'  value={(value) => dispatch({type:'put_value', name:'birth' , value:value})}></DateInput >
      </Validation>
      </div>
    </div>
  )
}

export default PersonalInfo;