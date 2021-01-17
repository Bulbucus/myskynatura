import { useEffect, useReducer, useContext, createContext } from "react";

import classes from "./SelectInput.module.scss";

import RightIcon from "../ErrorMessage/RightIcon";
import WrongIcon from "../ErrorMessage/WrongIcon";

import ErrorMessage from "../ErrorMessage/ErrorMessage";

// Custom Option Box
const Option = (props) => {
  return (
    <span
      className={[classes.Option, props.className].join(" ")}
      data-value={props.value}
    >
      {props.children}
    </span>
  );
};

// Custom DropBox
const Options = (props) => {
  return (
    <div
      className={[...state.toogleSelect, props.className].join(" ")}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};

// Custom Select
const SelectInput = (props) => {
  useEffect(() => {
    // para fechar o dropbox quando se carrega fora do dropbox
    const removeSelect = (event) => {
      if (
        stateSelect.toogleSelect[1] &&
        event.target.className !== classes.SelectInput &&
        event.target.className !== classes.Default &&
        event.target.className !== classes.Selected
      ) {
        dispatchSelect({ type: "close" });
      }
    };

    window && window.addEventListener("click", removeSelect);

    // Serve para apagar o evento para nao acumular
    return () => {
      window.removeEventListener("click", removeSelect);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateSelect.toogleSelect]);

  return (
    <>
    {props.errorMessage && <ErrorMessage></ErrorMessage>}
    <div className={classes.Container}>
      <div
        className={[classes.SelectInput, props.className].join(" ")}
        onClick={props.onClick}
        onBlur={props.onBlur}
        tabIndex="-1"
      >
        {stateValue.valueSelect ? <span className={classes.Selected}>{stateValue.valueSelect}</span> : <span className={classes.Default}>{props.default}</span>}
        {props.children}
      </div>
      {props.showIcon}
    </div>
    </>
  );
};


export {SelectInput, Options, Option };
