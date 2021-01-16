import classes from "./ErrorMessage.module.scss"

const ErrorMessage = (props) => {

  return(
    <>
    {props.errorMessage && <div className={classes.Message}>{props.errorMessage}</div>}
    </>
  )
}

export default ErrorMessage;