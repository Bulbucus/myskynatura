import { useEffect, useState } from "react";

import RightIcon from "./RightIcon";
import WrongIcon from "./WrongIcon";

const ErrorIcon = (props) => {

  const [Icon, setIcon] = useState('')

  useEffect(() => {
    if(props.error === 'right'){
      setIcon(<RightIcon ></RightIcon>)
    }else if (props.error === 'wrong'){
      setIcon(<WrongIcon></WrongIcon>)
    }
  },[props.error])


  return (
    <>
    {Icon}
    </>
  )
}

export default ErrorIcon;