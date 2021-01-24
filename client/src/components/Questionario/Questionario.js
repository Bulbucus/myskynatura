import { useState } from 'react';
import {Link} from 'react-router-dom';

import classes from './Questionario.module.scss';

import PersonalInfo from './PersonalInfo/PersonalInfo';
import Perguntas from './Perguntas/Perguntas';
import Registo from './Registo/Registo';


const Questionario = () => {

  const [form, setForm] = useState()

  console.log(form)
  return (
    <div>
      <PersonalInfo form={(object) => {setForm(object)}}></PersonalInfo>
      <div className={classes.separador}></div>
      <Perguntas></Perguntas>
      <div className={classes.separador}></div>
      <Registo form={(object) => {setForm(object)}}></Registo>
      <div className={classes.separador}></div>
      <Link className={classes.button} to='?'>Acabar o questionário</Link>
    </div>
  )
}

export default Questionario;