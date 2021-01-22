import {Link} from 'react-router-dom';

import classes from './Questionario.module.scss';

import PersonalInfo from './PersonalInfo/PersonalInfo';
import Perguntas from './Perguntas/Perguntas';
import Registo from './Registo/Registo';

const Questionario = () => {

  return (
    <div>
      <PersonalInfo></PersonalInfo>
      <div className={classes.separador}></div>
      <Perguntas></Perguntas>
      <div className={classes.separador}></div>
      <Registo></Registo>
      <div className={classes.separador}></div>
      <Link className={classes.button} to='?'>Acabar o questionário</Link>
    </div>
  )
}

export default Questionario;