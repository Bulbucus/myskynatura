import { useEffect, useState } from 'react';

import {SelectInput , Option} from '../SelectInput/SelectInput';

import classes from './DateInput.module.scss';

const MONTHS = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outrobro', 'Novembro', 'Dezembro']

const DateInput = (props) => {

  const [years, setYears] = useState([])

  useEffect(() => {
    console.log('render')
    const Year = new Date();
    let firstYear = Year.getFullYear();
    const allYears = []
    while (firstYear > 1920){
      //<Option classOption={classes.AnoOption} value={firstYear}>{firstYear.toString}</Option>
      allYears.push(<Option classOption={classes.AnoOption} key={firstYear} value={firstYear}>{firstYear.toString()}</Option>)
      firstYear -= 1;
    }
    setYears(allYears)
  }, [])

  return (
    <div>
      <div className={classes.Title}>Aniversário:</div>
      <div className={classes.InputContainer}>
        <SelectInput classSelectInput={classes.DiaInput} classOptions={classes.DiaOptions}  default='Dia'>
        </SelectInput>
        <SelectInput classSelectInput={classes.MesInput} classOptions={classes.MesOptions} default='Mes'>
        <Option classOption={classes.MesOption} value='01'>Janeiro</Option>
          <Option classOption={classes.MesOption} value='01'>Dezembro</Option>
        </SelectInput>
        <SelectInput classSelectInput={classes.AnoInput} classOptions={classes.AnoOptions} default='Ano'>
          {years}
        </SelectInput>
      </div>
    </div>
  )
}

export default DateInput;