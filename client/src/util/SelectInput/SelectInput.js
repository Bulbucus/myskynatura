import { useEffect, useReducer, useContext, createContext, useCallback, useMemo } from "react";

import classes from "./SelectInput.module.scss";

import ErrorIcon from "../ErrorMessage/ErrorIcon";

import ErrorMessage from "../ErrorMessage/ErrorMessage";

const SelectContext = createContext();

const initialState = {
  toogleSelect:[classes.OptionsOriginal],
  value:'',
  iconError:'',
  errorMessage:'',
}

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
        errorMessage:'',
        iconError: 'right',
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

// Custom Option Box
const Option = (props) => {
  const stateContext = useContext(SelectContext)

  return (
    <span
      className={[classes.OptionOriginal, props.className].join(" ")}
      onClick={(event) => {stateContext.dispatch({type:'put_value', value:event.target.innerHTML})}}
      data-value={props.value}
    >
      {props.children}
    </span>
  );
};

// Custom DropBox
const Options = (props) => {
  
  const stateContext = useContext(SelectContext)

  return (
    <div
      className={[...stateContext.state.toogleSelect, props.className].join(" ")}
    >
      {props.children}
    </div>
  );
};

// Custom Select
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
    console.log(state)
    
    window && window.addEventListener("click", removeSelect);
    // Serve para apagar o evento para nao acumular
    return () => {
      window.removeEventListener("click", removeSelect);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.toogleSelect]);

  return (
    <SelectContext.Provider value={{state,dispatch}}>
      {props.errorMessage && <ErrorMessage errorMessage={state.errorMessage}></ErrorMessage>}
      <div className={classes.Container}>
        <div
          className={[classes.SelectInputOriginal, props.className].join(" ")}
          onClick={() => {state.toogleSelect[1] ? dispatch({type:'close'}) : dispatch({type:'open'})}}
          onBlur={(props.onBlur) || ((props.showIcon && props.errorMessage) && (() => state.value ? dispatch({type:'right'}) : dispatch({type:'wrong'})))}
          tabIndex="-1"
        >
          {state.value ? <span className={classes.SelectedOriginal}>{state.value}</span> : <span className={classes.DefaultOriginal}>{props.default}</span>}
          {props.children}
        </div>
        {props.showIcon && <ErrorIcon error={state.iconError}></ErrorIcon>}
      </div>
    </SelectContext.Provider>
  );
};


export {SelectInput, Options, Option };
