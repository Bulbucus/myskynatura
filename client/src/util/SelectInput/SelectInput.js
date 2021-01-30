import { useEffect, useReducer, useContext, createContext } from "react";

import classes from "./SelectInput.module.scss";

// STATE MANAGEMENT
const SelectContext = createContext();

// INITIAL STATE ______________________________
const initialState = {
  toogleSelect:[classes.OptionsSelect],
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
    default:
      return;
  }
}

// Custom Option Box ______________________________________________
const Options = ({parentClass, childClass, options, onClick}) => {

  const [state] = useContext(SelectContext)

  return (
    <div className={[...state.toogleSelect, parentClass].join(" ")}>
      {options.map((option) => (
        <span className={[classes.OptionSelect, childClass].join(" ")} onClick={() => {onClick(option)}}> 
        {option}
        </span>
      ))}
    </div>
  );
};



// Custom Select _____________________________________________________________
const SelectInput = ({className, name, placeholder, value, children}) => {

  const [state,dispatch] = useReducer(reducer, initialState);

  // so executa quando o toogleselect muda
  useEffect(() => {
    // para fechar o dropbox quando se carrega fora do dropbox
    const removeSelect = (event) => {
      // so fecha o dropbox se o click for feito fora do select
      //(segundo argumento serve para quando existe mais que um select na pagina) 
      //e se o click for feito noutro select fecha o anterior
      if(name !== event.target.id ) {
        state.toogleSelect[1] && dispatch({ type: "close" })
      }
    }; 
    // cria um event que esta sempre ativo cada vez que o utilizador abre um select e carrega em algo
    window && window.addEventListener("click", removeSelect);
    // Serve para apagar o evento para nao acumular
    return () => {
      window.removeEventListener("click", removeSelect);
    };
  }, [name, state.toogleSelect]);

  // serve para abrir o select
  const openSelect = () => {
    return state.toogleSelect[1] ? dispatch({type:'close'}) : dispatch({type:'open'})
  }
  
  return (
    <SelectContext.Provider value={[state,dispatch]}>
        <div
          id={name}
          className={[classes.SelectInput, className].join(" ")}
          onClick={() => {openSelect()}} 
          tabIndex="-1"
        >
          <span className={ value ? classes.SelectedSelect : classes.DefaultSelect} id={name}>
            {value || placeholder}
          </span> 
          {children}
        </div>
    </SelectContext.Provider>
  );
};

export {SelectInput , Options };
