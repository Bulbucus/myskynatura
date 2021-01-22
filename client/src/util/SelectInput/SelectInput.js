import { useEffect, useReducer, useContext, createContext } from "react";

import classes from "./SelectInput.module.scss";

// STATE MANAGEMENT
const SelectContext = createContext();

// INITIAL STATE ______________________________
const initialState = {
  toogleSelect:[classes.OptionsSelect],
  value: '',
  htmlValue:'',
}

// REDUCER ________________________________
const reducer = (state, action) => {
  switch (action.type) {
    case 'open':
      return {
        ...state,
        toogleSelect:[...state.toogleSelect, classes.OpenSelect]
      }
    case 'close':
      return {
        ...state,
        toogleSelect:[classes.OptionsSelect]
      }
    case 'put_value':
      return {
        ...state,
        value: action.value,
        htmlValue: action.htmlValue,
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
    return stateContext.dispatch({type:'put_value', htmlValue:event.target.innerHTML, value:event.target.dataset.value})
  }

  return (
    <span
      className={[classes.OptionSelect, props.className].join(" ")}
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


// Custom defaultValue _____________________________________________________________
// argumentos: defaultValue:String(default value) data:String(se necessario)
// aceita props.children se necessario
const DefaultMessage = (props) => {

  const stateContext = useContext(SelectContext)


  //Vem logo com um valor em vez de o default
  const putValue = () => {
    return stateContext.dispatch({type:'put_value', htmlValue:props.children, value:props.value})
  }


  useEffect(() => {
    putValue()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {stateContext.state.value ? 
        <span className={classes.SelectedSelect} data-value={props.value || stateContext.state.value}>
          { props.children ||  stateContext.state.htmlValue}
          </span> : 
        <span className={classes.DefaultSelect} >
          {props.defaultValue}
        </span>}
    </>
  )
}


// Custom Select _____________________________________________________________
// argumentos: errorMessage:Boolean showIcon:Boolean
// aceita tambem onClick e onBlur
const SelectInput = (props) => {

  const [state,dispatch] = useReducer(reducer, initialState);


  useEffect(() => {
    // para fechar o dropbox quando se carrega fora do dropbox
    const removeSelect = (event) => {
      state.toogleSelect[1] && dispatch({ type: "close" })
    }; 
    
    window && window.addEventListener("click", removeSelect);

    // Serve para apagar o evento para nao acumular
    return () => {
      window.removeEventListener("click", removeSelect);
    };

  }, [state.toogleSelect]);


  // serve para abrir o select
  const openSelect = () => {
    return state.toogleSelect[1] ? dispatch({type:'close'}) : dispatch({type:'open'})
  }

  return (
    <SelectContext.Provider value={{state,dispatch}}>
        <div
          className={[classes.SelectInput, props.className].join(" ")}
          onClick={(event) => {openSelect(); (props.onClick && props.onClick(event))}}      
          onBlur={(props.onBlur)}
          tabIndex="-1"
        >
          {props.children}
        </div>
    </SelectContext.Provider>
  );
};

export {SelectInput, DefaultMessage , Options, Option };
