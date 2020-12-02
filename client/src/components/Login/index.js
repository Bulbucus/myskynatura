import ReactDOM from "react-dom";
import { useHistory, useLocation } from "react-router-dom";

import { connect } from "react-redux";
import actions from "../../redux/actions";

import { ReactComponent as Logo } from "../../images/Logo3.1.svg";
import { ReactComponent as CloseIcon } from "../../images/closeIcon.svg";

import classes from "./Autenc.module.css";

const Login = (props) => {
  // states
  const history = useHistory();
  const location = useLocation();
  // submit handler
  const submitHandler = async (event) => {
    event.preventDefault();
    await fetch(
      `${
        process.env.NODE_ENV === "production"
          ? process.env.REACT_APP_BACK_END_PROD
          : process.env.REACT_APP_BACK_END_DEV
      }/user/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        referrerPolicy: "no-referrer",
        credentials: "include",
        body: JSON.stringify({
          email: event.target.email.value,
          palavrapasse: event.target.password.value,
        }),
      }
    )
      .then((data) => data.json())
      .then((respond) => {
        if (respond.id && respond.email && respond.token) {

            // adiciona dados de user no redux store
            const { id, email ,token } = respond;
            props.userInfo(id, email,token);
            props.toogleLoginModel(false);

            // So executa se tiver um redirect:
            props.login.path && history.push(props.login.path);
        }
        if (respond.status === 500) {
          props.toogleLoginModel(true, respond.message);
        }
      })
      .catch((error) => {
        props.toogleLoginModel(true, error.message);
      });
  };
  //render
  const children = (
    <>
      <div className={classes.contentor}>
        <CloseIcon
          className={classes.icon}
          onClick={() => {props.toogleLoginModel(false,"", location.pathname)}}
        ></CloseIcon>
        <div className={classes.logoContentor}>
          <Logo></Logo>
        </div>
        <form
          id="autenc"
          className={classes.form}
          onSubmit={(event) => submitHandler(event)}
        >
          <span>{props.login.preMessageLogin}</span>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            className={classes.email}
            onChange={() => {
              props.toogleLoginModel(true, "", props.login.path);
            }}
          />
          <label>Password:</label>
          <input
            type="password"
            name="password"
            className={classes.password}
            onChange={() => {
              props.toogleLoginModel(true, "", props.login.path);
            }}
          ></input>
          <input type="submit" className={classes.submit} value="Login" />
        </form>
      </div>
      <div
        className={classes.fundoEscuro}
        onClick={() => {props.toogleLoginModel(false,"", location.pathname)}}
      ></div>
    </>
  );

  return ReactDOM.createPortal(children, document.getElementById("modal"));
};

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toogleLoginModel: (boolean, message, path) =>
      dispatch(actions.toogleLoginModel(boolean, message, path)),
    userInfo: (id, email, token) =>
      dispatch(actions.userInfo(id, email, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
