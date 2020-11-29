import { useState } from "react";
import { useHistory } from "react-router-dom";

// redux
import { connect } from "react-redux";
import actions from "../../redux/actions";

//css
import classes from "./Registar.module.css";

const Registar = (props) => {
  // state
  const [errorHandler, setErrorHandler] = useState("");

  //history
  const history = useHistory();

  // Handler
  // Envia o registo para o servidor
  const submitHandler = (event) => {
    event.preventDefault();

    if (
      event.target.palavrapasse.value !==
      event.target.confirmePalavrapasse.value
    ) {
      return setErrorHandler(
        "As passwords não são iguais, por favor verifique as mesmas."
      );
    }

    fetch(`${process.env.NODE_ENV === 'production'? process.env.REACT_APP_BACK_END_PROD : process.env.REACT_APP_BACK_END_DEV}/user/registar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        primeiro_nome: event.target.nome.value,
        ultimo_nome: event.target.sobrenome.value,
        idade: event.target.idade.value,
        genero: event.target.genero.value,
        email: event.target.email.value,
        palavrapasse: event.target.palavrapasse.value,
      }),
    })
      .then((data) => data.json())
      .then((respond) => {
        if (respond.status === 200) {
          history.push("/");
          props.toogleLoginModel(
            true,
            "Registo com sucesso por favor faça o login",
            "/resultado"
          );
        } else {
          setErrorHandler(respond.message);
        }
      });
  };

  //date
  const defaultIdade = new Date().toISOString();

  return (
    <div className={classes.ImagemAtras}>
      <div className={classes.containerQuestao}>Registo</div>
      <div className={classes.containerForma}>
        <form id="pessoal" onSubmit={(event) => submitHandler(event)}>
          <span>{errorHandler}</span>
          <label>Primeiro Nome:</label>
          <input name="nome" required={true} type="text" />

          <label>Ultimo Nome:</label>
          <input name="sobrenome" required={true} type="text" />

          <label>Idade:</label>
          <input
            name="idade"
            defaultValue={`${defaultIdade.substr(0, 10)}`}
            required={true}
            type="date"
          />
          <label>Genero:</label>
          <select name="genero" required={true}>
            <option value="F">Feminino</option>
            <option value="M">Masculino</option>
          </select>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            className={classes.email}
            required={true}
          />
          <label>Password:</label>
          <input
            type="password"
            name="palavrapasse"
            className={classes.password}
            minLength="6"
            required={true}
          />
          <label>Confirma Password:</label>
          <input
            type="password"
            name="confirmePalavrapasse"
            className={classes.password}
            required={true}
          />
        </form>
      </div>
      <label className={classes.containerSeguinte}>
        Fazer Registo
        <input style={{ display: "none" }} type="submit" form="pessoal" />
      </label>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    toogleLoginModel: (boolean, text, path) =>
      dispatch(actions.toogleLoginModel(boolean, text, path)),
  };
};

export default connect(null, mapDispatchToProps)(Registar);
