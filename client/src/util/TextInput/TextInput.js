import classes from "./TextInput.module.scss";

const TextInput = (props) => {

  return(
    <>
        <input 
          type={props.type}
          className={[classes.TextInput, props.className].join(' ')} 
          id={props.name} 
          name={props.name} 
          placeholder={props.defaultValue}
          onChange={props.onChange}
          value={props.value}
          >
        </input>
    </>
  )
}

export default TextInput;