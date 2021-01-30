import {useEffect, useReducer, useCallback} from 'react';

import classes from './Dados.module.scss';

import {checkValue} from '../../../util/Validation/checkValue'
import {ErrorMessage, ErrorIcon} from '../../../util/ErrorHandler/ErrorHandler';

import TextInput from '../../../util/TextInput/TextInput';
import {SelectInput, Options} from '../../../util/SelectInput/SelectInput';
import DateInput from '../../../util/DateInput/DateInput';

const initialState = {
  personalInfo:{
    primeiro_nome:{
      type: 'text',
      value:'',
      haveError:false,
      whatError: ''
    },
    ultimo_nome:{
      type: 'text',
      value:'',
      haveError:true,
      whatError: ''
    },
    genero:{
      type: 'select',
      value:'',
      haveError:true,
      whatError: ''
    },
    idade:{
      type: 'date',
      value:'',
      haveError:true,
      whatError: ''
    },
  }
}


const reducer = (state, action) => {
  switch (action.type) {
    case 'put_value_personalInfo':
      const checkedValue = checkValue(state.personalInfo[action.name].type, action.value)
      return {
        ...state,
        personalInfo:{
          ...state.personalInfo,
          [action.name]:{
            ...state.personalInfo[action.name],
            ...checkedValue,
            value: action.value
          }
        }
      }
      default:
        break
    }
}
  

const Dados = () => {

  const [state, dispatch] = useReducer(reducer,initialState)

  const dispatchValue = (data) => {
    dispatch({type:'put_value_personalInfo',name: data.name , value: data.value})
  }
  
  useEffect(() => {
    dispatch({type:'put_value_personalInfo', name:'primeiro_nome' , value:'Emanuel'})
    dispatch({type:'put_value_personalInfo', name:'ultimo_nome' , value:'Farinha'})
    dispatch({type:'put_value_personalInfo', name:'genero' , value:'Masculino'})
    dispatch({type:'put_value_personalInfo', name:'idade' , value:'1998-03-31'})
  },[])

    return (
      <>
        <div>
          <button className={classes.Title}>Meus Dados</button>
          <div className={classes.box}>
            <p className={classes.Description}>Primeiro Nome</p>
            <div className={classes.containerTextInput}>
              <ErrorMessage errorMessage={state.personalInfo.primeiro_nome.whatError}/>
              <TextInput 
                name='primeiro_nome' 
                value={state.personalInfo.primeiro_nome.value} 
                onChange={(event) => dispatchValue(event.target)}
              />
              <ErrorIcon error={state.personalInfo.primeiro_nome.haveError}/>
            </div>
            <p className={classes.Description}>Ultimo Nome</p>
            <div className={classes.containerTextInput}>
              <ErrorMessage errorMessage={state.personalInfo.ultimo_nome.whatError}/>
              <TextInput 
                name='ultimo_nome'
                value={state.personalInfo.ultimo_nome.value} 
                onChange={(event) => dispatchValue(event.target)}
              />
              <ErrorIcon error={state.personalInfo.ultimo_nome.haveError}/>
            </div>
            <p className={classes.Description}>Género</p>
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
            <p className={classes.TitleDate}>Aniversario</p>
            <ErrorMessage errorMessage={state.personalInfo.idade.whatError}/>
            <DateInput
                name='idade' 
                date={state.personalInfo.idade.value}
                value={useCallback((value) => {dispatch({type:'put_value_personalInfo', input:'date', name:'idade',value:value})},[dispatch])}
              />
              <ErrorIcon error={state.personalInfo.idade.haveError}/>
            <div className={classes.separador}></div>
            <button className={classes.button}>Editar dados</button>
          </div>
        </div>
      </>
    )
}
  
export default Dados;