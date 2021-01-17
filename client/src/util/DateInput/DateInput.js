/* eslint-disable eqeqeq */
import { useEffect, useState } from 'react';

import {SelectInput,Options, Option, DefaultMessage} from '../SelectInput/SelectInput';

import classes from './DateInput.module.scss';

const MONTHS = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outrobro', 'Novembro', 'Dezembro']


// Funçao que coloca os valores no state automaticamente, evitando repetiçao
const setOptionsState = (type, value, stateFunc, index) => {
  return (
    (optionsDate) => ({
      ...optionsDate, 
      [`${type}s`]:[
        ...optionsDate[`${type}s`], 
        <Option 
          key={value} 
          value={index === undefined ? value : index} 
          onClick={(event) => {stateFunc((selectOptions) => ({...selectOptions,[type]:event.target.dataset.value}));}}>
            {value}
        </Option>]
    })
  )
}

const cleanState = (type) => {
  return (optionsDate) => ({...optionsDate, [type]: []})
}



const DateInput = (props) => {

  // state de todos os valores
  const [optionsDate, setOptionsDate] = useState({
    years:[],
    months:[],
    days:[]
  })

  // state dos valores selecionados
  const [selectOptions, setSelectOptions] = useState({
    year:0,
    month:0,
    day:0
  })

  // funçao que so é executada uma vez quando se carrega no select indicado
  const setOptions = (type) => {
    switch (type) {
      case 'years':
        const date = new Date();
        const currYear = date.getFullYear()
        for(let i = currYear; i > 1920; i -= 1){
          setOptionsDate(setOptionsState('year', i, setSelectOptions))
        }
        break;
      case 'months':
        for(let i = 0; i < MONTHS.length; i += 1){
          let month = MONTHS[i]
          setOptionsDate(setOptionsState('month', month, setSelectOptions, i))
        }
        break;
      default :
        break;
    }

  }

  // Loop para criar as opçoes do dia
  const daysLoop = (lastDay) => {
    for(let i = 1; i <= lastDay; i += 1) {
      setOptionsDate(setOptionsState('day', i, setSelectOptions))
    }
  }


  // re-renderiza o componente quando os valores selecionados mudam e verifica se o valor do dia é correto consoante o ano e o mes:
  useEffect(() => {
    // limpa os dias cada vez que 
    setOptionsDate(cleanState('days'));
    if(selectOptions.month % 2){
      if(selectOptions.month == 1 ){
        if(( selectOptions.year % 4 == 0 && selectOptions.year % 100 != 0 ) || (selectOptions.year % 400 == 0)){
          selectOptions.day > 29 && setSelectOptions((selectOptions) => ({...selectOptions,day:29}))
          return daysLoop(29)
        } else {
          selectOptions.day > 28 && setSelectOptions((selectOptions) => ({...selectOptions,day:28}))
          return daysLoop(28)
        }
      }
    selectOptions.day > 30 && setSelectOptions((selectOptions) => ({...selectOptions,day:30}))
    return daysLoop(30)
    }
    else if (!(selectOptions.month % 2)){
      return daysLoop(31)
    }
  },[selectOptions.day,selectOptions.month, selectOptions.year])


  return (
    <div>
      <div className={classes.Title}>Aniversário:</div>
      <SelectInput className={classes.SelectInput}  onClick={(event) => {optionsDate.days.length < 1 && setOptions("days")}}>
        <DefaultMessage defaultValue='Dia' data-value={selectOptions.day}>
          {selectOptions.day}
        </DefaultMessage>
        <Options className={classes.Options} >
          {optionsDate.days}
        </Options>
      </SelectInput>
      <SelectInput className={classes.SelectInput} onClick={(event) => {(optionsDate.months.length < 1 && setOptions("months"))}}>
        <DefaultMessage defaultValue='Mes' />
        <Options className={classes.Options}>
          {optionsDate.months}
        </Options>
      </SelectInput>
      <SelectInput className={classes.SelectInput} onClick={(event) => {optionsDate.years.length < 1 && setOptions("years")}}>
        <DefaultMessage defaultValue='Ano'/>
        <Options className={classes.Options}>
          {optionsDate.years}
        </Options>
      </SelectInput>
    </div>
  )
}

export default DateInput;