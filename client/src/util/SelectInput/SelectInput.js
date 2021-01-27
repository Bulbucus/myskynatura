import { useEffect, useReducer, useContext, createContext, useCallback } from "react";

import classes from "./SelectInput.module.scss";

// STATE MANAGEMENT
const SelectContext = createContext();

// INITIAL STATE ______________________________
const initialState = {
  type: '',
  name: '',
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
    case 'put_name':
      return{
        ...state,
        name: action.name
      }
    case 'put_type':
        return{
          ...state,
          type: action.name
        }
    default:
      return;
  }
}

// Custom Option Box ______________________________________________
// Aceita onClick se necessario
const Option = ({className, value, onClick ,children}) => {
  const [state,dispatch] = useContext(SelectContext)

  const putValue = (event) => {
    return dispatch({type:'put_value', htmlValue:event.target.innerHTML, value:event.target.dataset.value})
  }

  return (
    <span
      className={[classes.OptionSelect, className].join(" ")}
      onClick={(event) => {putValue(event); onClick && onClick(event)}}
      data-type={state.type} 
      data-name={state.name} 
      data-value={value}
    >
      {children}
    </span>
  );
};


// Custom DropBox _____________________________________________________________
const Options = ({className, children}) => {
  
  const [state] = useContext(SelectContext)

  return (
    <div className={[...state.toogleSelect, className].join(" ")}>
      {children}
    </div>
  );
};


// Custom defaultValue _____________________________________________________________
// argumentos: defaultValue:String(default value) data:String(se necessario)
// aceita children se necessario
const DefaultMessage = ({value, defaultValue, children}) => {

  const [state, dispatch] = useContext(SelectContext)

  //Vem logo com um valor em vez de o default
  const putValue = useCallback(() => {
    return dispatch({type:'put_value', htmlValue:children, value:value})
  },[dispatch, children, value])

  // so executa quando vem com valor do props:
  useEffect(() => {
    putValue()
  }, [putValue])

  return (
        <span 
          className={state.value ? classes.SelectedSelect : classes.DefaultSelect} 
          data-type={state.type} 
          data-name={state.name} 
          data-value={value || state.value}
        >
          {state.value ? children ||  state.htmlValue : defaultValue}
        </span> 
  )
}


// Custom Select _____________________________________________________________
// argumentos: errorMessage:Boolean showIcon:Boolean
// aceita tambem onClick e onBlur
const SelectInput = ({className, onClick, name, type, children}) => {

  const [state,dispatch] = useReducer(reducer, initialState);

  // so executa quando o toogleselect muda
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
  // quando abre coloca tambem o tipo e o id em todas as opcoes
  const openSelect = () => {
    dispatch({type:'put_type', name: type})
    dispatch({type:'put_name', name: name})
    return state.toogleSelect[1] ? dispatch({type:'close'}) : dispatch({type:'open'})
  }

  return (
    <SelectContext.Provider value={[state,dispatch]}>
        <div
          name={name}
          className={[classes.SelectInput, className].join(" ")}
          onClick={(event) => {openSelect(); (onClick && onClick(event))}}      
          tabIndex="-1"
        >
          {children}
        </div>
    </SelectContext.Provider>
  );
};

export {SelectInput, DefaultMessage , Options, Option };
