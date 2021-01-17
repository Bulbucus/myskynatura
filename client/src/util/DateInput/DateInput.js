import { useEffect, useState } from 'react';

import {SelectInput,Options, Option} from '../SelectInput/SelectInput';

import classes from './DateInput.module.scss';

const MONTHS = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outrobro', 'Novembro', 'Dezembro']

const DateInput = (props) => {


  return (
    <div>
      <div className={classes.Title}>Aniversário:</div>
      <Select className={classes.Select}>
        <Options>
          <Option>01</Option>
        </Options>
      </Select>
    </div>
  )
}

export default DateInput;