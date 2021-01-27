import { useEffect, useState } from "react";

import { ReactComponent as RightIcon} from '../../assets/RightIcon.svg';
import { ReactComponent as WrongIcon} from '../../assets/WrongIcon.svg';

import classes from './ErrorHandler.module.scss';

const ErrorIcon = (props) => {

  const [Icon, setIcon] = useState('')

  useEffect(() => {
    if(!props.error){
      setIcon(<RightIcon className={classes.RightIcon}></RightIcon>)
    }else if (props.error){
      setIcon(<WrongIcon className={classes.WrongIcon}></WrongIcon>)
    }
  },[props.error])


  return (
    <>
    {Icon}
    </>
  )
}

const ErrorMessage = (props) => {

  return(
    <>
    {props.errorMessage && <div className={classes.Message}>{props.errorMessage}</div>}
    </>
  )
}

export {ErrorMessage, ErrorIcon};