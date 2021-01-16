import { useEffect, useState } from 'react';

import classes from "./SelectInput.module.scss";

import { ReactComponent as RightIcon} from '../../assets/RightIcon.svg'
import { ReactComponent as WrongIcon} from '../../assets/WrongIcon.svg'


// Custom Option para o Custom Select
const Option = (props) => {
  return (
      <span className={[classes.Option, props.classOption].join(' ')} value={props.value}>{props.children}</span>
  )
}

const SelectInput = (props) => {

  const [checkedValue, setCheckedValue] = useState();
  const [message, setMessage] = useState();

    // Verifica se o valor colocado no texto nao tem letras especiais.
    // Para melhor segurança e experiencia de utilizador.
  const checkValue = (value) => {
    if(value){
      setCheckedValue(<RightIcon className={classes.RightIcon}></RightIcon>)
      props.checkedValue && props.checkedValue(true);
      setMessage();
    } else {
      setCheckedValue(<WrongIcon className={classes.WrongIcon}></WrongIcon>)
      props.checkedValue && props.checkedValue(false);
      setMessage("Por favor, selecione uma opção.");
    }
  }


  // Custom Select
  // dropbox customizado pois é mais seguro em termos de compatibilidade
  const [optionSelect, setOptionSelect] = useState('')
  const [classeSelect, setClasseSelect] = useState([classes.Options]);
  useEffect(() => {
    // para fechar o dropbox quando se carrega fora do dropbox
    const removeSelect = event => {
      if(classeSelect[1] &&
        event.target.className !== classes.SelectInput 
        && event.target.className !== classes.Default 
        && event.target.className !== classes.Selected
        ){
          setClasseSelect([classes.Options])
        }
    }
    window && window.addEventListener('click', removeSelect);

    // Serve para apagar o evento para nao acumular
    return () => {
      window.removeEventListener('click', removeSelect);
    };
  
  },[classeSelect])


  return(
    <>
      {message && 
        <div className={classes.Message}>{message}</div>
      }
      <div className={[classes.Container, props.classContainer].join(' ')}>
        <div 
          className={[classes.SelectInput, props.classSelectInput].join(' ')}
          onClick={() => {classeSelect[1] ?  setClasseSelect([classes.Options]) : setClasseSelect((currClasses) => [currClasses, classes.OpenSelect])}}
          onBlur={() => {props.checkedValue && checkValue(optionSelect)}}
          tabIndex="-1"
          >
            {optionSelect ? <span className={classes.Selected}>{optionSelect}</span> : <span className={classes.Default}>{props.default}</span>}
            <div 
              className={[...classeSelect, props.classOptions].join(' ')}
              onClick={event => {
                setOptionSelect(event.target.innerHTML)
                props.checkedValue && checkValue(event.target.innerHTML)
              }}
              >
                {props.children}
            </div>
        </div>
        {checkedValue}
      </div>
    </>
  )
}

export {SelectInput , Option};
