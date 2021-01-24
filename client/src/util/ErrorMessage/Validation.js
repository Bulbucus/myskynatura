import { useEffect, useState } from 'react'
import ErrorIcon from './ErrorIcon'
import ErrorMessage from './ErrorMessage'


const regexName = /\W|\d/g

const checkValue = (value, setErrorMessage, setIcon, error, whereError, type) => {

  const Ouput = (type, reason) => {
    setErrorMessage(reason)
    setIcon(type)
    return error(type === 'right' ? false : true, whereError)
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
    if(value.includes('@')){
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
    if(value.search(regexName) !== -1) {  
      return Ouput('wrong', 'Por favor, colocar apenas letras.')
    } else if(value.length < 2){
      return Ouput('wrong', 'Letras insuficientes, precisa mais que 2 letras')
    } 
    return Ouput('right', '')
  }

}


const checkPassword = (password, confirmPassword, setErrorMessage, setIcon, error, whereError, type) => {
  const Ouput = (type, reason) => {
    setErrorMessage(reason)
    setIcon(type)
    return error(type === 'right' ? false : true, whereError)
  }

  if(password !== confirmPassword) {
    return Ouput('wrong', 'As passwords não são iguais, por favor verifique as mesmas.')
  }
  return Ouput('right', '');
}

const Validation = ({error, value, password, confirmPassword, children}) => {

  const [errorMessage, setErrorMessage] = useState();
  const [icon, setIcon] = useState('wrong');
  const [whereError, setWhereError] = useState();
  const [type, setType] = useState();

  useEffect(() => {
    //whereError em primeiro para evitar criar undefined no state:
    whereError && checkValue(value, setErrorMessage, setIcon, error, whereError, type)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[value])
  
  useEffect(() => {

    if(password && confirmPassword){
    whereError && checkPassword(password, confirmPassword ,setErrorMessage, setIcon, error, whereError, type)
    }

  }, [password, confirmPassword])

return (
    <div 
      onChange={(event) => {setWhereError(event.target.name); setType(event.target.type)}} 
      onClick={(event) => {setWhereError(event.target.dataset.name); setType(event.target.dataset.type)}}
    >
      <ErrorMessage errorMessage={errorMessage}></ErrorMessage>
      {children}
      <ErrorIcon error={icon}></ErrorIcon>
    </div>
  )
}

export default Validation;