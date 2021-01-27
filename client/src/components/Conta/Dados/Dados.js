import {useEffect, useReducer} from 'react';

import classes from './Dados.module.scss';

import TextInput from '../../../util/TextInput/TextInput';
import {SelectInput, DefaultMessage, Options, Option} from '../../../util/SelectInput/SelectInput';
import DateInput from '../../../util/DateInput/DateInput';

const initialState = {
  personalInfo:{
    primeiro_nome:{
      value:'',
      haveError:false
    },
    ultimo_nome:{
      value:'',
      haveError:false
    },
    genero:{
      value:'',
      haveError:false
    },
    idade:{
      value:'',
      haveError:true
    },
  }
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'put_value_personalInfo':
      return {
        ...state,
        personalInfo:{
          ...state.personalInfo,
          [action.name]:{
            ...state.personalInfo[action.name],
            value: action.value
          }
        }
      }
    case 'toogle_error':
      return {
        ...state,
        personalInfo:{
          ...state.personalInfo,
          [action.name]:{
            ...state.personalInfo[action.name],
            haveError:action.boolean
          }
        }
      }
    default:
      break;
  }
}
  

const Dados = () => {

  const [state, dispatch] = useReducer(reducer,initialState)

  const dispatchValue = (event) => {
    dispatch({type:'put_value_personalInfo', name:event.target.name , value:event.target.value})
  }

  const dispatchError = (boolean, name) => {
    dispatch({type:'toogle_error', boolean:boolean, name: name})
  }

  useEffect(() => {
    dispatch({type:'put_value_personalInfo', name:'primeiro_nome' , value:'Emanuel'})
  },[])

  console.log(state)
    return (
      <>
        <div>
          <button className={classes.Title}>Meus Dados</button>
          <div className={classes.box}>
            <p className={classes.Description}>Primeiro Nome</p>
            <div className={classes.containerTextInput}>

              <TextInput type='text' defaultValue='Primeiro Nome' name='primeiro_nome' value={state.personalInfo.primeiro_nome.value} onChange={(event) => dispatchValue(event)}></TextInput>
            
            </div>
            <p className={classes.Description}>Ultimo Nome</p>
            <div className={classes.containerTextInput}>
            <TextInput type='text' value='Farinha'>Farinha</TextInput>
            </div>
            <p className={classes.Description}>Género</p>
            <SelectInput className={classes.SelectInput}>
              <DefaultMessage value='Masculino'>Masculino</DefaultMessage>
              <Options>
                <Option value='Feminino'>Feminino</Option>
                <Option value='Masculino'>Masculino</Option>
              </Options>
            </SelectInput>
            <p className={classes.TitleDate}>Aniversario</p>
            <DateInput day='31' month='03' year='1998'></DateInput>
            <div className={classes.separador}></div>
            <button className={classes.button}>Editar dados</button>
          </div>
        </div>
      </>
    )
}
  
export default Dados;