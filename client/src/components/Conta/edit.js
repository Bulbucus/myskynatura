import { useState } from "react";

import classes from "./Conta.module.css";

import { ReactComponent as BackIcon } from "../../images/backIcon.svg";

const EditConta = (props) => {
  const [errorHandler, getErrorHandler] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();
    fetch(
      `${
        process.env.NODE_ENV === "production"
          ? process.env.REACT_APP_BACK_END_PROD
          : process.env.REACT_APP_BACK_END_DEV
      }/user/updateUser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        referrerPolicy: "no-referrer",
        credentials: "include",
        body: JSON.stringify({
          id: props.id,
          primeiro_nome: event.target.nome.value,
          ultimo_nome: event.target.sobrenome.value,
          idade: event.target.idade.value,
          genero: event.target.genero.value,
        }),
      }
    )
      .then((data) => data.json())
      .then((respond) => {
        if (respond.status === 200) {
          props.getToggleModifInfo(false);
        }
        getErrorHandler(respond.message);
      });
  };

  return (
    <div className={classes.Main}>
      <div className={classes.containerTitle}>A minha conta:</div>
      <div className={classes.Container}>
        <BackIcon
          className={classes.backIcon}
          onClick={() => {
            props.getToggleModifInfo(false);
          }}
        />
        <p className={classes.MainTitle}>Os meus dados:</p>
        <p>{errorHandler}</p>
        <form
          className={[classes.Info, classes.InputContainer].join(" ")}
          id="pessoal"
          onSubmit={(event) => submitHandler(event)}
        >
          <p>Primeiro Nome:</p>
          <input
            name="nome"
            required={true}
            type="text"
            defaultValue={props.userInfo.primeiro_nome}
          />
          <p>Ultimo Nome:</p>
          <input
            name="sobrenome"
            required={true}
            type="text"
            defaultValue={props.userInfo.ultimo_nome}
          />
          <p>Idade:</p>
          <input
            name="idade"
            required={true}
            type="date"
            defaultValue={props.userInfo.idade}
          />
          <p>Genero:</p>
          <select
            name="genero"
            required={true}
            defaultValue={props.userInfo.genero}
          >
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
  );
};

export default EditConta;
