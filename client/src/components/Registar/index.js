import {useHistory} from "react-router-dom";

import classes from "./Registar.module.css";

const Registar = () => {
  // State
  const defaultIdade = new Date().toISOString();
  const history = useHistory();

  // Handler

  const submitHandler = (event) => {
    event.preventDefault();
    
  };

  return (
    <div className={classes.ImagemAtras}>
      <div className={classes.containerQuestao}>Registo</div>
      <div className={classes.containerForma}>
        <form id="pessoal" onSubmit={(event) => submitHandler(event)}>
          <label>
            Primeiro Nome:
            <input
              name="nome"
              required={true}
              type="text"
            />
          </label>
          <label>
            Ultimo Nome:
            <input
              name="sobrenome"
              required={true}
              type="text"
            />
          </label>
          <label>
            Idade:
            <input
              name="idade"
              defaultValue={
                `${defaultIdade.substr(0, 10)}`
              }
              required={true}
              type="date"
            />
          </label>
          <label>
            Genero:
            <select
              name="genero"
              required={true}
            >
              <option value="F">Feminino</option>
              <option value="M">Masculino</option>
            </select>
          </label>
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
            name="password"
            className={classes.password}
            required={true}
          />
          <label>Confirma Password:</label>
          <input
            type="password"
            name="confirmePassword"
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

export default Registar;
