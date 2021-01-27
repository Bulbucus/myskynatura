import {useEffect, useState } from 'react'
import ErrorIcon from './ErrorIcon'
import ErrorMessage from './ErrorMessage'

const checkValue = (value, setErrorMessage, setIcon, type) => {

  const Ouput = (type, reason) => {
    setErrorMessage(reason)
    setIcon(type)
  }

  // se o input for uma data:
  if(type === 'date') {
    const Date = value.split('-')
    if(Date.filter(element => element === '0').length < 1){
      return Ouput('right', '')
    }
  }

  // se o input for um email:
  if(type === 'email') {
    // regex para verificar se é mesmo um email valido:
    if((/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(value)){
      return Ouput('right', '')
    }
    return Ouput('wrong', 'Por favor, coloque um email valido')
  }

  // se for uma password
  if(type === 'password'){
      if(value.length < 7){
        return Ouput('wrong', 'A password necessita de ter pelo menos 7 caracteres')
      } else if (value.search(/[A-Z]/g) === -1){
        return Ouput('wrong', 'Necessita de pelo menos uma letra maiuscula')
      }
      return Ouput('right', '')

  }

  // se for um input comum
  if(type === 'text'){
    if(value.search(/[0-9]|[!-/]|[:-@]|[[-`]|[{-~]/g) !== -1) {  
      return Ouput('wrong', 'Por favor, colocar apenas letras.')
    } else if(value.length < 3){
      return Ouput('wrong', 'Letras insuficientes, precisa mais que 2 letras')
    } 
    return Ouput('right', '')
  }

}


const checkPassword = (password, confirmPassword, setErrorMessage, setIcon) => {
  const Ouput = (type, reason) => {
    setErrorMessage(reason)
    setIcon(type)
  }

  if(password !== confirmPassword) {
    return Ouput('wrong', 'As passwords não são iguais, por favor verifique as mesmas.')
  }
  return Ouput('right', '');
}

const Validation = ({error, value, password, confirmPassword ,children}) => {

  const [errorMessage, setErrorMessage] = useState();
  const [icon, setIcon] = useState('wrong');
  const [whereError, setWhereError] = useState();
  const [type, setType] = useState();


  useEffect(() => {
    
    // se for um input de password
    if(password && confirmPassword){
      return whereError && checkPassword(password, value ,setErrorMessage, setIcon)
    }

    //whereError em primeiro para evitar criar undefined no state:
    return whereError && checkValue(value, setErrorMessage, setIcon, type)


  },[type, whereError, value, password, confirmPassword])

return (
    <div 
      onChange={(event) => {setWhereError(event.target.name); setType(event.target.type);}}
      onClick={(event) => {setWhereError(event.target.dataset.name); setType(event.target.dataset.type)}}
      onBlur={() => {error(icon === 'right' ? false : true, whereError)}}
    >
      <ErrorMessage errorMessage={errorMessage}></ErrorMessage>
      {children}
      <ErrorIcon error={icon}></ErrorIcon>
    </div>
  )
}

export default Validation;