import { useState } from 'react';

import classes from "./TextInput.module.scss";

import RightIcon from '../ErrorMessage/RightIcon'
import WrongIcon from '../ErrorMessage/WrongIcon'

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
        setCheckedValue(<WrongIcon className={classes.WrongIcon}></WrongIcon>)
        props.checkedValue(false);
        setMessage("Por favor, coloque apenas letras.");
      }else{
        setCheckedValue(<RightIcon className={classes.RightIcon}></RightIcon>)
        props.checkedValue(true);
        setMessage();
      }
    } else {
      setCheckedValue(<WrongIcon className={classes.WrongIcon}></WrongIcon>)
      props.checkedValue(false);
      setMessage("Por favor preencha com os dados corretos.");
    }
  }

  return(
    <>
      <ErrorMessage errorMessage={message}></ErrorMessage>
      <div className={classes.Container}>
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
        {props.showIcon && checkedValue}
      </div>
    </>
  )
}

export default TextInput;