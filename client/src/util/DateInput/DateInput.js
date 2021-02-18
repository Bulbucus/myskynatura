import { useEffect, createContext, useReducer, useCallback } from 'react';

import {SelectInput,Options,} from '../SelectInput/SelectInput';

import classes from './DateInput.module.scss';

// Criar context para o componente
const DateContext = createContext()

// State inicial
const InitialState = {
  options:{
    years:[],
    months:['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
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
    if(state.selected.month !== 0){
    const monthIndex = state.options.months.findIndex(el => el === state.selected.month)
    let month_withTwoZeros = monthIndex + 1
    if(monthIndex + 1 < 10) {month_withTwoZeros = `0${monthIndex + 1}`}
    return month_withTwoZeros;
    }
  },[state.options.months, state.selected.month])

  // ira renderizar as options para o ano quando cria o componente
  useEffect(() => {
    dispatch({type:'get_years'})
  },[])

  // coloca os dados do parente (date) , se existir, no initialState
  useEffect(() => {
    if(date){
    dispatch({type:'put_value', option:'day', event:day})
    dispatch({type:'put_value', option:'month', event:state.options.months[Number(month-1)]})
    dispatch({type:'put_value', option:'year', event:year})
    }
  }, [date, day, month, state.options.months, year])
  

  // executa so quando é selecionado um novo dia, mes ou ano
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
    
    // so envia o valor para o parente se os states nao estiverem vazios:
    // isto porque se o useeffect executa cada vez que um deles muda e se
    // mudamos um dos inputs e os outros estao vazios iremos mandar os outros inputs vazios para o parent
    // desta forma evita isso e obriga que so envia o valor para o parent se no state todos tiverem valores
    // o que irá fazer uma perfomance melhor e evita bugs
    if(state.selected.day !== 0 && state.selected.month !== 0 && state.selected.year !== 0){
      const month = numericMonth()
      // Envia valor da data para parente
      // em formado (yyyy-mm-dd)
      value && value(`${state.selected.year}-${month}-${state.selected.day}`)
    }
  
  }, [numericMonth, state.selected.day, state.selected.month, state.selected.year, value])



  return (
    <DateContext.Provider value={{state, dispatch}}>
      {/* o elemento span com id igual a 'name' serve para que os handler de erros o consigam identificar */}
      <span id={name}>
      <SelectInput 
        className={classes.DiaInput} 
        placeholder='Dia' 
        name='dia' 
        value={state.selected.day || day}>
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
        value={state.selected.month || state.options.months[Number(month-1)]}>
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
        value={state.selected.year || year}>
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