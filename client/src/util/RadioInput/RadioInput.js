import classes from './RadioInput.module.scss';

const RadioInput = (props) => {

  return (
    <>
    <input
    className={classes.Radio}
    type={props.type}
    id={props.id}
    value={props.id}
    name={props.name}
    onClick={(event) => {props.onClick(event)}}
    >
    </input>
    <span className={classes.CustomRadio}></span>
  </>
  )
}

export default RadioInput;