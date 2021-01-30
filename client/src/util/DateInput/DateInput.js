import { useEffect, createContext, useReducer, useCallback } from 'react';

import {SelectInput,Options,} from '../SelectInput/SelectInput';

import classes from './DateInput.module.scss';

// Criar context para o componente
const DateContext = createContext()

// State inicial
const InitialState = {
  options:{
    years:[],
    months:['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outrobro', 'Novembro', 'Dezembro'],
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


const DateInput = ({name, value, date}) => {

  const [state, dispatch] = useReducer(reducer, InitialState)

  // se receber props.date que vem em 'yyyy-mm-dd', separa numa array e insere no render nos seus respetivos
  let [year, month, day] = [];
  if(date){
    [year, month, day] = date.split('-')
  }

  // transforma o mes de nome para numero (ex: de fevereiro para '02')
  const numericMonth = useCallback(() => {
    const monthIndex = state.options.months.findIndex(el => el === state.selected.month)
    let month_withTwoZeros = monthIndex
    if(monthIndex < 10) {month_withTwoZeros = `0${monthIndex+1}`}
    return month_withTwoZeros;
  },[state.options.months, state.selected.month])

  // ira criar no state os anos todos automaticamente ao renderizar a primeira vez e uma unica vez
  useEffect(() => {
    dispatch({type:'get_years'})
  }, [])
  

  // executar funçao so quando é selecionado um novo dia, mes ou ano
  useEffect(() => {

    const getDays = () => {
      // Modificar o input select dos dias automaticamente consoante o ano e o mes que é selecionado
      switch(state.selected.month) {
        case 'Fevereiro':
          if((state.selected.year % 4 === 0 && state.selected.year % 100 !== 0) || state.selected.year % 400 === 0) {
              return dispatch({type:'get_days', lengthDays:29})
            }
            return dispatch({type:'get_days', lengthDays:28})
        case 'Abril':
        case 'Junho':
        case 'Setembro':
        case 'Novembro':
          return dispatch({type:'get_days', lengthDays:30})
        default:
          return dispatch({type:'get_days', lengthDays:31})
      }
    }
    getDays()
    
    const month = numericMonth()
    // Envia valor da data para parente
    // em formado (yyyy-mm-dd)
    value && value(`${state.selected.year}-${month}-${state.selected.day}`)
  
  }, [value, state.selected.day, state.selected.month, state.selected.year, numericMonth])



  return (
    <DateContext.Provider value={{state, dispatch}}>
      {/* o elemento span com id igual a 'name' serve para que os handler de erros o consigam identificar */}
      <span id={name}>
      <SelectInput 
        className={classes.DiaInput} 
        placeholder='Dia' 
        name='dia' 
        value={day || state.selected.day}>
        <Options 
          parentClass={classes.Options} 
          childClass={classes.Option} options={[...state.options.days]} 
          onClick={(value) => {dispatch({type:'put_value', option:'day', event:value})}}
        />
      </SelectInput>
      <SelectInput 
        className={classes.MesInput} 
        placeholder='Mes' 
        name='mes' 
        value={month ||state.selected.month}>
        <Options 
          parentClass={classes.Options} 
          childClass={classes.Option} options={[...state.options.months]} 
          onClick={(value) => {dispatch({type:'put_value', option:'month', event:value})}}
        />
      </SelectInput>
      <SelectInput 
        className={classes.AnoInput} 
        placeholder='Ano' 
        name='ano' 
        value={year || state.selected.year}>
        <Options 
          parentClass={classes.Options} 
          childClass={classes.Option} options={[...state.options.years]} 
          onClick={(value) => {dispatch({type:'put_value', option:'year', event:value})}}
        />
      </SelectInput>
      </span>
    </DateContext.Provider>
  )
}

export default DateInput;