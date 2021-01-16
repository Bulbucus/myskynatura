import { useEffect, useState } from 'react';

import {SelectInput , Option} from '../SelectInput/SelectInput';

import classes from './DateInput.module.scss';

const MONTHS = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outrobro', 'Novembro', 'Dezembro']

const DateInput = (props) => {


  return (
    <div>
      <div className={classes.Title}>Aniversário:</div>
      <div className={classes.InputContainer}></div>
    </div>
  )
}

export default DateInput;