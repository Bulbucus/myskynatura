/* eslint-disable eqeqeq */
import { useEffect, useState } from 'react';

import {SelectInput,Options, Option, DefaultMessage} from '../SelectInput/SelectInput';

import classes from './DateInput.module.scss';

//Constante ______________________________
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
          className={classes.Option}
          onClick={(event) => {
            stateFunc((selectOptions) => ({...selectOptions,[type]:event.target.dataset.value}));
            }}>
            {value}
        </Option>]
    })
  )
}
  
// para limpar a array do state especifico
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

  // funçao que so é executada quando se carrega no select indicado
  const setOptions = (type) => {
    switch (type) {
      case 'years':
        const firstYearAllow = 2005;
        for(let i = firstYearAllow; i > 1910; i -= 1){
          setOptionsDate(setOptionsState('year', i, setSelectOptions))
        }
        break;
      case 'months':
        for(let i = 0; i < MONTHS.length; i += 1){
          let addZero = i;
        if(i < 10) {addZero = `0${i}`}
          let month = MONTHS[i]
          setOptionsDate(setOptionsState('month', month, setSelectOptions, addZero))
        }
        break;
      default :
        break;
    }

  }

  // coloca os valores no state se vier do props inicialmente
  useEffect(() => {
    if(props.day && props.month && props.year){
      setSelectOptions({
        day:props.day,
        month: props.month,
        year:props.year
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  // re-renderiza o componente quando os valores selecionados mudam e verifica se o valor do dia é correto consoante o ano e o mes:
  useEffect(() => {
    // limpa os dias cada vez que o mes muda ou se é ano bissexto
    setOptionsDate(cleanState('days'));

      // modifica os dias que da para selecionar nos options
    const setStateDays = (days) => {
      selectOptions.day > days && setSelectOptions((selectOptions) => ({...selectOptions,day:days}))
      for(let i = 1; i <= days; i += 1) {
        let addZero = i;
        if(i < 10) {addZero = `0${i}`}
        setOptionsDate(setOptionsState('day', addZero, setSelectOptions))
      }
    }

    // verifica se o mes tem 31 ou 30 dias e se for fevereiro mostra apenas 28 ou 29 dias
    if(selectOptions.month % 2){
      if(selectOptions.month == 1 ){
        if(( selectOptions.year % 4 == 0 && selectOptions.year % 100 != 0 ) || (selectOptions.year % 400 == 0)){
          return setStateDays(29)
        } else {
          return setStateDays(28)
        }
      }
    return setStateDays(30)
    }
    else if (!(selectOptions.month % 2)){
      return setStateDays(31)
    }
  
  },[selectOptions.day,selectOptions.month, selectOptions.year])


  return (
    <>
      <div className={classes.Container}>
      <SelectInput className={classes.DiaInput}  onClick={(event) => {optionsDate.days.length < 1 && setOptions("days")}}>
        <DefaultMessage defaultValue='Dia' value={selectOptions.day || props.day}>
          {selectOptions.day || props.day}
        </DefaultMessage>
        <Options className={classes.Options} >
          {optionsDate.days}
        </Options>
      </SelectInput>
      <SelectInput className={classes.MesInput} onClick={(event) => {(optionsDate.months.length < 1 && setOptions("months"))}}>
        <DefaultMessage defaultValue='Mes' value={selectOptions.month || props.month}>
          {selectOptions.month || MONTHS[Number(props.month)]}
        </DefaultMessage>
        <Options className={classes.Options} >
          {optionsDate.months}
        </Options>
      </SelectInput>
      <SelectInput className={classes.AnoInput} onClick={(event) => {optionsDate.years.length < 1 && setOptions("years")}}>
        <DefaultMessage defaultValue='Ano' value={selectOptions.year || props.year}>
          {selectOptions.year || props.year}
        </DefaultMessage>
        <Options className={classes.Options}>
          {optionsDate.years}
        </Options>
      </SelectInput>
      </div>
      </>
  )
}

export default DateInput;