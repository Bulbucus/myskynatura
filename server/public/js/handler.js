// alerta se quer executar certa tarefa
const confirmFunction = (event) => {
  const windowConfirm = window.confirm("Tem a certeza que quer executar essa funçao?")
  if(!windowConfirm){
    event.preventDefault()
  }
}

// remove a row de uma opcao
const remove = (event) => {
  const parent = event.path[2]
  parent.remove()
}