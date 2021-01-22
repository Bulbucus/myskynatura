import { useState } from "react";
import classes from "./TextInput.module.scss";

const TextInput = (props) => {

  const [value, setValue] = useState(props.value || '')

  return(
    <>
      <div className={[classes.ContainerText, props.classContainer].join(' ')}>
        <input 
          type={props.type}
          className={[classes.TextInput, props.className].join(' ')} 
          id={props.name} 
          name={props.name} 
          placeholder={props.defaultValue}
          value={value}
          onChange={(event) => {setValue(event.target.value)}}
          >
        </input>
      </div>
    </>
  )
}

export default TextInput;