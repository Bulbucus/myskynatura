import { useEffect, useState } from "react";

import { connect } from "react-redux";

import EditConta from "./edit";

import classes from "./Conta.module.css";

const Conta = (props) => {
  const [userInfo, getUserInfo] = useState({});
  const [toggleModifInfo, getToggleModifInfo] = useState(false);

  useEffect(() => {
    fetch(
      `${
        process.env.NODE_ENV === "production"
          ? process.env.REACT_APP_BACK_END_PROD
          : process.env.REACT_APP_BACK_END_DEV
      }/user/getUser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        referrerPolicy: "no-referrer",
        credentials: "include",
        body: JSON.stringify({
          id: props.user.id,
          token: props.user.token,
        }),
      }
    )
      .then((data) => data.json())
      .then((respond) => {
        getUserInfo(respond);
      });
  }, [props.user.id, props.user.token, toggleModifInfo]);

  const ModifInfo = (event) => {
    event.preventDefault();
    getToggleModifInfo(true);
  };

  return (
    <>
      {toggleModifInfo ? (
        <EditConta
          userInfo={userInfo}
          getToggleModifInfo={getToggleModifInfo}
          id={props.user.id}
        ></EditConta>
      ) : (
        <div className={classes.Main}>
          <div className={classes.containerTitle}>A minha conta:</div>
          <div className={classes.Container}>
            <p className={classes.MainTitle}>Os meus dados:</p>
            <div className={classes.Info}>
              <p>Primeiro Nome:</p>
              <p>{userInfo.primeiro_nome}</p>
              <p>Ultimo Nome:</p>
              <p>{userInfo.ultimo_nome}</p>
              <p>Idade:</p>
              <p>{userInfo.idade}</p>
              <p>Genero:</p>
              <p>
                {userInfo.genero && userInfo.genero === "F"
                  ? "Feminino"
                  : "Masculino"}
              </p>
            </div>
            <button
              className={classes.button}
              onClick={(event) => ModifInfo(event)}
            >
              Mudar Dados
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

export default connect(mapStateToProps)(Conta);
