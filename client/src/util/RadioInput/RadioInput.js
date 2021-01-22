import classes from './RadioInput.module.scss';

const RadioInput = (props) => {
  return (
    <>
    <input
    className={classes.Radio}
    type="radio"
    id={props.id}
    value={props.id}
    name={props.name}
    >
    </input>
    <span className={classes.CustomRadio}></span>
  </>
  )
}

export default RadioInput;