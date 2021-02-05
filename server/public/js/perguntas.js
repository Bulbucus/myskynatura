
const button = document.getElementsByName('add_resposta')[0];
let number = document.getElementsByClassName('respostas').length

// cria uma row para mais uma resposta
button.addEventListener('click', () => {
  const lastTr = document.querySelector(`#resposta_${number}`);
  let cloneTr = lastTr.cloneNode(true)
  let newTr = cloneTr.getElementsByTagName('input')

  // se ao adicionar uma nova resposta a ultima na row for um "nenhum das anterios",
  // passar essa para baixo e adicionar acima
  if(newTr[1].value.includes('_nenhum')){
    const inputLastTr = lastTr.getElementsByTagName('input')
    inputLastTr[0].value = '';
    inputLastTr[1].value = '';
    inputLastTr[0].name = 'new[opcao_texto]'
    inputLastTr[1].name = 'new[tag]'
    inputLastTr[2] && inputLastTr[2].remove();
  }else {
    newTr[0].value= ''
    newTr[1].value= ''
    newTr[0].name = 'new[opcao_texto]'
    newTr[1].name = 'new[tag]';
    newTr[2] && newTr[2].remove();
  }
  number = number + 1;

  cloneTr.setAttribute('id', `resposta_${number}`)


  lastTr.insertAdjacentElement('afterend', cloneTr)
})

// alerta se quer executar certa tarefa
const confirmFunction = (event) => {
  const windowConfirm = window.confirm("Tem a certeza que quer apagar?")
  if(!windowConfirm){
    event.preventDefault()
  }
}