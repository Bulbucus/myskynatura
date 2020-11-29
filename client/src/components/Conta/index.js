import { useEffect, useState } from "react";

import { connect } from "react-redux";

import {ReactComponent as BackIcon} from '../../images/backIcon.svg'

import classes from "./Conta.module.css";

const Conta = (props) => {
  const [userInfo, getUserInfo] = useState({});
  const [toggleModifInfo, getToggleModifInfo] = useState(false);
  const [errorHandler, getErrorHandler] = useState("");

  useEffect(() => {
    fetch(`${process.env.NODE_ENV === 'production'? process.env.REACT_APP_BACK_END_PROD : process.env.REACT_APP_BACK_END_DEV}/user/getUser`, {
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
    })
      .then((data) => data.json())
      .then((respond) => {
        getUserInfo(respond);
      });
  }, [props.user.id, props.user.token, toggleModifInfo]);

  const ModifInfo = (event) => {
    event.preventDefault();
    getToggleModifInfo(true);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    fetch(`${process.env.NODE_ENV === 'production'? process.env.REACT_APP_BACK_END_PROD : process.env.REACT_APP_BACK_END_DEV}/user/updateUser`,{
      method:'POST',
      headers:{
        'Content-Type' : 'application/json',
      },
      referrerPolicy: "no-referrer",
      credentials: "include",
      body:JSON.stringify({
        id: props.user.id,
        primeiro_nome: event.target.nome.value,
        ultimo_nome: event.target.sobrenome.value,
        idade: event.target.idade.value,
        genero: event.target.genero.value,
      })
    })
      .then(data => data.json()).then(respond => {
        if(respond.status === 500){
          getErrorHandler(respond.message);
        }
        getToggleModifInfo(false)
      })
  };

  return (
    <>
      {toggleModifInfo ? (
            <div className={classes.Main}>
            <div className={classes.containerTitle}>A minha conta:</div>
            <div className={classes.Container}>
              <BackIcon className={classes.backIcon} onClick={() => {getToggleModifInfo(false)}}></BackIcon>
              <p className={classes.MainTitle}>Os meus dados:</p>
              <p>{errorHandler}</p>
              <form className={[classes.Info, classes.InputContainer].join(' ')} id="pessoal" onSubmit={(event) => submitHandler(event)}>
              <p >Primeiro Nome:</p>
                <input name="nome" required={true} type="text" defaultValue={userInfo.primeiro_nome}/>
                <p >Ultimo Nome:</p>
                <input name="sobrenome" required={true} type="text" defaultValue={userInfo.ultimo_nome}/>
                <p >Idade:</p>
                <input name="idade" required={true} type="date" defaultValue={userInfo.idade}/>
                <p >Genero:</p>
                <select name="genero" required={true} defaultValue={userInfo.genero}>
                    <option value="F">Feminino</option>
                    <option value="M">Masculino</option>
                </select>
              </form>
              <label className={classes.button}>
                Gravar alterações
                <input style={{ display: "none" }} type="submit" form="pessoal" />
              </label>
            </div>
          </div>
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
