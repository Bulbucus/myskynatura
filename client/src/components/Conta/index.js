import DadosUsuario from "./DadosUsuario/index";

import classes from "./Conta.module.css";

const Conta = (props) => {
  return (
        <div className={classes.Main}>
          <div className={classes.containerTitle}>A minha conta:</div>
          <DadosUsuario></DadosUsuario>
        </div>
  );
};

export default Conta;
