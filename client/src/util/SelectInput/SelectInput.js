import { useState } from 'react';

import classes from "./SelectInput.module.scss";

import { ReactComponent as RightIcon} from '../../assets/RightIcon.svg'
import { ReactComponent as WrongIcon} from '../../assets/WrongIcon.svg'

const SelectInput = (props) => {

  const [checkedValue, setCheckedValue] = useState(); 

  // Verifica se o valor colocado no texto nao tem letras especiais.
  // Para melhor segurança e experiencia de utilizador.
  const checkValue = (event) => {
    if(event.target.value){
      const {value} = event.target;
      const regex = /[`~=!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\/]|\d/;
      if (value.match(regex)) {
        setCheckedValue(<WrongIcon className={classes.WrongIcon}></WrongIcon>)
        props.checkedValue(false);
      }else{
        setCheckedValue(<RightIcon className={classes.RightIcon}></RightIcon>)
        props.checkedValue(true);
      }
    } else {
      setCheckedValue(<WrongIcon className={classes.WrongIcon}></WrongIcon>)
      props.checkedValue(false);
    }
  }

  return(
    <div className={classes.Container}>
      <select 
        className={classes.SelectInput} 
        id={props.name} 
        name={props.name} 
        onBlur={(event) => {checkValue(event)}}
        defaultValue=''
        required
        >
        <option value='' hidden disabled>{props.default}</option>
        {props.children}
      </select>
      {checkedValue}
    </div>
  )
}

export default SelectInput;