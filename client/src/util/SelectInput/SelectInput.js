import { useEffect, useReducer, useContext, createContext } from 'react';

import classes from "./SelectInput.module.scss";

import RightIcon from '../ErrorMessage/RightIcon'
import WrongIcon from '../ErrorMessage/WrongIcon'

import ErrorMessage from '../ErrorMessage/ErrorMessage';

// state para abrir e fechar o select
const stateSelectContext = createContext()
const dispatchSelectContext = createContext();

// state do valor do select
const stateValueContext = createContext()
const dispatchValueContext = createContext();

const initialState = {
  select:{
    toogleSelect:[classes.Options],
  },
  value:{
    errorMessage:'',
    checkedValue:'',
    valueSelect:'',
  }
}

// REDUCERS ---------------------------------------

function toogleSelectReducer(state, action) {
  switch(action.type) {
    case 'open':
      return {
        ...state,
        toogleSelect:[...state.toogleSelect, classes.OpenSelect]
      };
    case 'close':
      return {
        ...state,
          toogleSelect:[classes.Options]
      };
    default:
      return;
  }
}

function checkedValueReducer(state, action){
  switch(action.type) {
    case true:
      return {
        ...state,
        valueSelect: action.value,
        checkedValue:<RightIcon className={classes.RightIcon}></RightIcon>,
        errorMessage:''
      }
    case false:
      return {
        ...state,
        checkedValue:<WrongIcon className={classes.WrongIcon}></WrongIcon>,
        errorMessage:'Por favor, selecione uma opção.'
      }
      default:
        return;
  }
}


// Custom Option Box
const Option = (props) => {
  return (
      <span 
        className={[classes.Option, props.className].join(' ')} 
        data-value={props.value}>{props.children}
      </span>
  )
}

// Custom DropBox
const Options = (props) => {
  //useContext
  const dispatchValue = useContext(dispatchValueContext)
  const state = useContext(stateSelectContext)

  return (
    <div 
      className={[...state.toogleSelect, props.className].join(' ')}
      onClick={event => {dispatchValue({type:true, value:event.target.innerHTML})}}>
      {props.children}
    </div>
  )
}


// Custom Select
const Select = (props) => {
  
  //useReducer
  const [stateSelect, dispatchSelect] = useReducer(toogleSelectReducer, initialState.select)
  //useContext
  const dispatchValue = useContext(dispatchValueContext)
  const stateValue = useContext(stateValueContext);

  useEffect(() => {
    // para fechar o dropbox quando se carrega fora do dropbox
    const removeSelect = (event) => {
      if(stateSelect.toogleSelect[1] &&
        event.target.className !== classes.SelectInput 
        && event.target.className !== classes.Default 
        && event.target.className !== classes.Selected
        ){
          dispatchSelect({type:'close'})
        }
    }

    window && window.addEventListener('click', removeSelect);

    // Serve para apagar o evento para nao acumular
    return () => {
      window.removeEventListener('click', removeSelect);
    };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[stateSelect.toogleSelect])
  

  return (
    <dispatchSelectContext.Provider value={dispatchSelect}>
      <stateSelectContext.Provider value={stateSelect}>
      <div
      className={[classes.SelectInput, props.className].join(' ')}
      onClick={() => {stateSelect.toogleSelect[1] ? dispatchSelect({type:'close'}) : dispatchSelect({type:'open'})}}
      onBlur={() => {stateValue.valueSelect ? dispatchValue({type:true, value:stateValue.valueSelect }): dispatchValue({type:false})}}
      tabIndex="-1"
      >
        {props.children}
      </div>
      </stateSelectContext.Provider>
    </dispatchSelectContext.Provider>
  )
}


const SelectInput = (props) => {

  const [stateValue,dispatchValue] = useReducer(checkedValueReducer,initialState.value)
  
  return(
    <dispatchValueContext.Provider value={dispatchValue}>
      <stateValueContext.Provider value={stateValue}>
        {props.errorMessage && <ErrorMessage errorMessage={stateValue.errorMessage}></ErrorMessage>}
        <div className={classes.Container}>
          <Select>
              {stateValue.valueSelect ? <span className={classes.Selected}>{stateValue.valueSelect}</span> : <span className={classes.Default}>{props.default}</span>}
              <Options>
                  {props.children}
              </Options>
          </Select>
          {props.showIcon && stateValue.checkedValue}
        </div>
      </stateValueContext.Provider>
    </dispatchValueContext.Provider>
  )
}

export {SelectInput , Option};
