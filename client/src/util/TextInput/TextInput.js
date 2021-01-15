import { useState } from 'react';

import classes from "./TextInput.module.scss";

import { ReactComponent as RightIcon} from '../../assets/RightIcon.svg'
import { ReactComponent as WrongIcon} from '../../assets/WrongIcon.svg'

const TextInput = (props) => {

  const [goodValue, setGoodValue] = useState(); 

  // Verifica se o valor colocado no texto nao tem letras especiais.
  // Para melhor segurança e experiencia de utilizador.
  const checkValue = (event) => {
    if(event.target.value){
      const {value} = event.target;
      const regex = /[`~=!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\/]|\d/;

      if (value.match(regex)) {
        setGoodValue(<WrongIcon className={classes.WrongIcon}></WrongIcon>)
        props.checkedValue(false);
      }else{
        setGoodValue(<RightIcon className={classes.RightIcon}></RightIcon>)
        props.checkedValue(true);
      }
    } else {
      setGoodValue(<WrongIcon className={classes.WrongIcon}></WrongIcon>)
      props.checkedValue(false);
    }
  }

  return(
    <div className={classes.Container}>
      <input 
        type='text' 
        className={classes.TextInput} 
        id={props.name} 
        name={props.name} 
        placeholder={props.default} 
        onBlur={(event) => {checkValue(event)}}>
      </input>
      {goodValue}
    </div>
  )
}

export default TextInput;