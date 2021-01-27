// verifica os valores em tempo real
const checkValue = (input, value) => {
  if(value){
    // se o input for uma data:
    if(input === 'date') {
      const Date = value.split('-')
      if(Date.filter(element => element === '0').length < 1){
        return {haveError:false, whatError:''}
      }
    }
  
    // se o input for um email:
    if(input === 'email') {
      // regex para verificar se é mesmo um email valido:
      if((/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(value)){
        return {haveError:false, whatError:''}
      }
      return {haveError:true, whatError:'Por favor, coloque um email valido'}
    }
  
    //se for uma password
    if(input === 'password'){
      if(value.length < 7){
        return {haveError:true, whatError:'A password necessita de ter pelo menos 7 caracteres'}
      } else if (value.search(/[A-Z]/g) === -1){
        return {haveError:true, whatError:'Necessita de pelo menos uma letra maiuscula'}
      }
      return {haveError:false, whatError:''}
    }
  
    // se for nome ou subnome
    if(input === 'text'){
      if(value.search(/[0-9]|[!-/]|[:-@]|[[-`]|[{-~]/g) !== -1) {  
        return {haveError:true, whatError:'Por favor, colocar apenas letras.'}
      } else if(value.length < 3){
        return {haveError:true, whatError:'Letras insuficientes, precisa mais que 2 letras.'}
      } 
      return {haveError:false, whatError:''}
    }
  }
}


// verifica se a password e confirm_password sao iguais:
const checkPassword = (value, passwordValue) => {
  if(value !== passwordValue){
    return {haveError:true, whatError:'As passwords não são iguais, por favor verifique.'}
  } else if (!passwordValue){
    return {haveError:true, whatError:''}
  }
  return {haveError:false, whatError:''}
}

export {checkValue, checkPassword};