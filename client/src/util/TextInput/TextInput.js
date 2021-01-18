import { useState } from 'react';

import classes from "./TextInput.module.scss";

import ErrorIcon from "../ErrorMessage/ErrorIcon"

import ErrorMessage from '../ErrorMessage/ErrorMessage';

const TextInput = (props) => {

  const [checkedValue, setCheckedValue] = useState();
  const [message, setMessage] = useState();

  // Verifica se o valor colocado no texto nao tem letras especiais.
  // Para melhor segurança e experiencia de utilizador.
  const checkValue = (event) => {
    if(event.target.value){
      const {value} = event.target;
      const regex = /[`~=!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\/]|\d/;

      if (value.match(regex)) {
        props.checkedValue(false);
        setCheckedValue('wrong')
        setMessage("Por favor, coloque apenas letras.");
      }else{
        props.checkedValue(true);
        setCheckedValue('right')
        setMessage();
      }
    } else {
      props.checkedValue(false);
      setCheckedValue('wrong')
      setMessage("Por favor preencha com os dados corretos.");
    }
  }

  return(
    <>
      {props.errorMessage && <ErrorMessage errorMessage={message}></ErrorMessage>}
      <div className={classes.ContainerText}>
        <input 
          type='text' 
          className={classes.TextInput} 
          id={props.name} 
          name={props.name} 
          placeholder={props.default} 
          onBlur={(event) => {checkValue(event)}}
          onChange={(event) => {checkValue(event)}}
          >
        </input>
        {props.showIcon && <ErrorIcon error={checkedValue} ></ErrorIcon>}
      </div>
    </>
  )
}

export default TextInput;