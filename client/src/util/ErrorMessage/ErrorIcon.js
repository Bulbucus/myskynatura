import { useEffect, useState } from "react";

import { ReactComponent as RightIcon} from '../../assets/RightIcon.svg';
import { ReactComponent as WrongIcon} from '../../assets/WrongIcon.svg';

import classes from './ErrorIcon.module.scss';

const ErrorIcon = (props) => {

  const [Icon, setIcon] = useState('')

  useEffect(() => {
    if(props.error === 'right'){
      setIcon(<RightIcon className={classes.RightIcon}></RightIcon>)
    }else if (props.error === 'wrong'){
      setIcon(<WrongIcon className={classes.WrongIcon}></WrongIcon>)
    }
  },[props.error])


  return (
    <>
    {Icon}
    </>
  )
}

export default ErrorIcon;