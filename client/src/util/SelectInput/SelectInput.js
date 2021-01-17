import { useEffect, useReducer, useContext, createContext } from "react";

import classes from "./SelectInput.module.scss";

import ErrorIcon from "../ErrorMessage/ErrorIcon";

import ErrorMessage from "../ErrorMessage/ErrorMessage";

const SelectContext = createContext();

// INITIAL STATE ______________________________
const initialState = {
  toogleSelect:[classes.OptionsOriginal],
  id: '',
  html:'',
  iconError:'',
  errorMessage:'',
}

// REDUCER ________________________________
const reducer = (state, action) => {
  switch (action.type) {
    case 'open':
      return {
        ...state,
        toogleSelect:[...state.toogleSelect, classes.OpenSelectOriginal]
      }
    case 'close':
      return {
        ...state,
        toogleSelect:[classes.OptionsOriginal]
      }
    case 'put_value':
      return {
        ...state,
        value: action.value,
        html: action.html,
        errorMessage:'',
        iconError: 'right',
      }
    case 'clean_value':
      return {
        ...state,
        value:'',
        html:'',
        errorMessage:'',
        iconError: '',
      }
    case 'right':
      return{
        ...state,
        iconError: action.type,
        errorMessage:'',
      }
    case 'wrong':
      return{
        ...state,
        iconError:action.type,
        errorMessage:'Por favor preencha com os dados corretos.'
      }
    default:
      return;
  }
}

// Custom Option Box ______________________________________________
// Aceita onClick se necessario
const Option = (props) => {
  const stateContext = useContext(SelectContext)

  const putValue = (event) => {
    return stateContext.dispatch({type:'put_value', html:event.target.innerHTML, value:event.target.dataset.value})
  }

  return (
    <span
      className={[classes.OptionOriginal, props.className].join(" ")}
      onClick={(event) => {putValue(event); (props.onClick && props.onClick(event))}}
      data-value={props.value}
    >
      {props.children}
    </span>
  );
};

// Custom DropBox _____________________________________________________________
const Options = (props) => {
  
  const stateContext = useContext(SelectContext)

  return (
    <div className={[...stateContext.state.toogleSelect, props.className].join(" ")}>
      {props.children}
    </div>
  );
};

// Custom defaultValue
// argumentos: defaultValue:String(default value) data:String(se necessario)
// aceita props.children se necessario
const DefaultMessage = (props) => {

  const stateContext = useContext(SelectContext);
  
  return (
    <>
      {stateContext.state.value ? 
        <span className={classes.SelectedOriginal} data-value={props.data || stateContext.state.value}>{props.children ||stateContext.state.html}</span> : 
        <span className={classes.DefaultOriginal}>{props.defaultValue}</span>}
    </>
  )
}


// Custom Select
// argumentos: errorMessage:Boolean showIcon:Boolean
// aceita tambem onClick e onBlur
const SelectInput = (props) => {

  const [state,dispatch] = useReducer(reducer, initialState);


  useEffect(() => {
    // para fechar o dropbox quando se carrega fora do dropbox
    const removeSelect = (event) => {
      if (
        state.toogleSelect[1] &&
        event.target.className !== classes.SelectInputOriginal &&
        event.target.className !== classes.DefaultOriginal &&
        event.target.className !== classes.SelectedOriginal
      ) {
        dispatch({ type: "close" });
      }
    }; 
    
    window && window.addEventListener("click", removeSelect);

    // Serve para apagar o evento para nao acumular
    return () => {
      window.removeEventListener("click", removeSelect);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.toogleSelect]);

  // serve para abrir o select
  const openSelect = () => {
    return state.toogleSelect[1] ? dispatch({type:'close'}) : dispatch({type:'open'})
  }

  return (
    <SelectContext.Provider value={{state,dispatch}}>
    {props.errorMessage && <ErrorMessage errorMessage={state.errorMessage}></ErrorMessage>}
      <div className={classes.Container}>
        <div
          className={[classes.SelectInputOriginal, props.className].join(" ")}
          onClick={(event) => {openSelect(); (props.onClick && props.onClick(event))}}      
          onBlur={(props.onBlur) || ( (props.showIcon || props.errorMessage) && (() => state.value ? dispatch({type:'right'}) : dispatch({type:'wrong'})) ) }
          tabIndex="-1"
        >
          {props.children}
        </div>
        {props.showIcon && <ErrorIcon error={state.iconError}></ErrorIcon>}
      </div>
    </SelectContext.Provider>
  );
};


export {SelectInput, DefaultMessage , Options, Option };
