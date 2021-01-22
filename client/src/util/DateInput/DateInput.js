import { useEffect, createContext, useReducer } from 'react';

import {SelectInput,Options, Option, DefaultMessage} from '../SelectInput/SelectInput';

import classes from './DateInput.module.scss';

//Constante ______________________________
const MONTHS = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outrobro', 'Novembro', 'Dezembro']

const DateContext = createContext()

const InitialState = {
  options:{
    years:[],
    months:[],
    days:[],
  },
  selected:{
    year:0,
    month:0,
    day:0,
  }
}

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

  useEffect(() => {
    getDays()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.selected.month, state.selected.year])

  return (
    <DateContext.Provider value={{state, dispatch}}>
      <div className={classes.Container}>
      <SelectInput className={classes.DiaInput}  onClick={() => {getDays()}}>
        <DefaultMessage defaultValue='Dia' value={state.selected.day}>
          {state.selected.day}
        </DefaultMessage>
        <Options className={classes.Options} >
          {state.options.days.map(day => <Option key={day} value={day} className={classes.Option} onClick={(event) => {dispatch({type:'put_value', option:'day', event:event.target.dataset.value})}}>{day}</Option>)}
        </Options>
      </SelectInput>
      <SelectInput className={classes.MesInput} onClick={() => {dispatch({type:'get_months'})}}>
        <DefaultMessage defaultValue='Mes' value={state.selected.month}>
          {MONTHS[state.selected.month]}
        </DefaultMessage>
        <Options className={classes.Options} >
          {state.options.months.map((month, index) => <Option key={month} value={month} className={classes.Option} onClick={(event) => {dispatch({type:'put_value', option:'month', event:event.target.dataset.value})}}>{MONTHS[index]}</Option>)}
        </Options>
      </SelectInput>
      <SelectInput className={classes.AnoInput} onClick={() => {dispatch({type:'get_years'})}}>
        <DefaultMessage defaultValue='Ano' value={state.selected.year}>
          {state.selected.year}
        </DefaultMessage>
        <Options className={classes.Options}>
          {state.options.years.map(year => <Option key={year} value={year} className={classes.Option} onClick={(event) => {dispatch({type:'put_value', option:'year', event:event.target.dataset.value})}}>{year}</Option>)}
        </Options>
      </SelectInput>
      </div>
      </DateContext.Provider>
  )
}

export default DateInput;