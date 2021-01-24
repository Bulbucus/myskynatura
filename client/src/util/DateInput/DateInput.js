import { useEffect, createContext, useReducer } from 'react';

import {SelectInput,Options, Option, DefaultMessage} from '../SelectInput/SelectInput';

import classes from './DateInput.module.scss';

//Constante ______________________________
const MONTHS = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outrobro', 'Novembro', 'Dezembro']

// Criar context para o componente
const DateContext = createContext()

// State inicial
const InitialState = {
  options:{
    years:[],
    months:[],
    days:[],
  },
  selected:{
    year: 0,
    month: 0,
    day:0,
  }
}

// reducer para inserir os valores no state
const reducer = (state, action) => {

  switch (action.type) {
    case 'get_years':
      const firstYearAllow = 2005;
      const years = []
      for(let i = firstYearAllow; i > 1910; i -= 1){
        years.push(i)
      }
      return {
        ...state,
        options:{
          ...state.options,
          years:years
        }
      }
    case 'get_months':
      const months = []
      for(let i = 1; i <= MONTHS.length; i += 1){
        let addZero = i
        if(i < 10) {addZero = `0${i}`}
        months.push(addZero)
      }
      return {
        ...state,
        options:{
          ...state.options,
          months:months
        }
      }
    case 'get_days':
      const days = []
      for(let i = 1; i <= action.lengthDays; i += 1){
          let addZero = i
          if(i < 10) {addZero = `0${i}`}
          days.push(addZero)
      }
      return {
        selected:{
          ...state.selected,
          // serve para mudar o dia automaticamente se um novo mes for selecionado e o dia selecionado nao existir
          // no mes novo (exemplo mes que tem 31 dias e meses que so tem 30 dias)
          day: (action.lengthDays < state.selected.day ? action.lengthDays : state.selected.day)
        },
        options:{
          ...state.options,
          days:days
        }
      }
    case 'put_value':
      return{
        ...state,
        selected:{
          ...state.selected,
          [action.option]: action.event
        }
      }
    default:
      return null;
  }
}


const DateInput = (props) => {

  const [state, dispatch] = useReducer(reducer,InitialState)

  
  const getDays = () => {
    // Envia valor da data para parente
    // em formado (yyyy-mm-dd)
    props.value && props.value(`${state.selected.year}-${state.selected.month}-${state.selected.day}`)

    // Modificar o input select dos dias automaticamente consoante o ano e o mes que é selecionado
    switch(state.selected.month) {
      case '02':
        if((state.selected.year % 4 === 0 && state.selected.year % 100 !== 0) || state.selected.year % 400 === 0) {
            return dispatch({type:'get_days', lengthDays:29})
          }
          return dispatch({type:'get_days', lengthDays:28})
      case '04':
      case '06':
      case '09':
      case '11':
        return dispatch({type:'get_days', lengthDays:30})
      default:
        return dispatch({type:'get_days', lengthDays:31})
    }
  }

  // executar funçao so quando é selecionado um mes ou um ano ou um dia novo
  useEffect(() => {
    getDays()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.selected.day, state.selected.month, state.selected.year])

  // quando recebe um valor proveninte do props, valores recebeidos pelo back-end
  useEffect(() => {
    if(props.day && props.month && props.year){
    dispatch({type:'put_value', option:'day', event:props.day})
    dispatch({type:'put_value', option:'month', event:props.month})
    dispatch({type:'put_value', option:'year', event:props.year})
    }
  },[props.day, props.month, props.year])

  return (
    <DateContext.Provider value={{state, dispatch}}>
      <SelectInput className={classes.DiaInput} type={props.type} name={props.name} onClick={() => {getDays()}}>
        <DefaultMessage defaultValue='Dia' value={state.selected.day || props.day}>
          {state.selected.day || props.day}
        </DefaultMessage>
        <Options className={classes.Options} >
          {state.options.days.map(day => <Option key={day} value={day} className={classes.Option} onClick={(event) => {dispatch({type:'put_value', option:'day', event:event.target.dataset.value})}}>{day}</Option>)}
        </Options>
      </SelectInput>
      <SelectInput className={classes.MesInput} type={props.type} name={props.name} onClick={() => {dispatch({type:'get_months'})}}>
        <DefaultMessage defaultValue='Mes' value={state.selected.month || props.month}>
          {MONTHS[Number(state.selected.month-1)] || MONTHS[Number(props.month-1)]}
        </DefaultMessage>
        <Options className={classes.Options} >
          {state.options.months.map((month, index) => <Option key={month} value={month} className={classes.Option} onClick={(event) => {dispatch({type:'put_value', option:'month', event:event.target.dataset.value})}}>{MONTHS[index]}</Option>)}
        </Options>
      </SelectInput>
      <SelectInput className={classes.AnoInput} type={props.type} name={props.name} onClick={() => {dispatch({type:'get_years'})}}>
        <DefaultMessage defaultValue='Ano' value={state.selected.year || props.year}>
          {state.selected.year || props.year}
        </DefaultMessage>
        <Options className={classes.Options}>
          {state.options.years.map(year => <Option key={year} value={year} className={classes.Option} onClick={(event) => {dispatch({type:'put_value', option:'year', event:event.target.dataset.value})}}>{year}</Option>)}
        </Options>
      </SelectInput>
      </DateContext.Provider>
  )
}

export default DateInput;