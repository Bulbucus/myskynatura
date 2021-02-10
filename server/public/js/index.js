const button = document.getElementsByName('add_resposta')[0];

// criar o botao Remover (apagar apenas do DOM)
const removeButton = () => {
  const rb = document.createElement('input');
  rb.setAttribute('type', 'button')
  rb.setAttribute('onclick', 'remove(event)')
  rb.setAttribute('value', 'Remover')
  return rb;
}

// cria uma row para mais uma opcao
button.addEventListener('click', () => {
  const length = document.getElementsByClassName('resposta').length
  const lastTr = document.getElementsByClassName('resposta')[length - 1];

  let cloneTr = lastTr.cloneNode(true)
  let newTr = cloneTr.getElementsByTagName('select')

  // se nao encontrar nenhum select procura por input
  // pois a pagina produtos sao com selects e a pagina perguntas com inputs
  if(newTr.length === 0) {newTr = cloneTr.getElementsByTagName('input')}
  

  newTr[0].value= ''
  newTr[0].name = 'new[opcao]'
  // so na pagina perguntas é que existe um segundo elemento nos inputs
  if (newTr[1]) {
    newTr[1].value = ''
    newTr[1].name = 'new[tag]';
  }

  // se ao adicionar uma resposta a anterior tirar o metodo "apagar"(apagar da base de dados), remove-a do clone e adiciona
  // o botao de remover(apaga apenas no DOM)
  const th = cloneTr.getElementsByTagName('th')
  if(th[th.length - 1].firstChild.tagName === 'BUTTON'){

    th[th.length - 1].firstChild.remove()

    const createRB = removeButton()

    th[th.length - 1].appendChild(createRB)
  }


  // se tiver o clone tiver no terceiro th tiver um input hidden, (normalmente o id) apaga-o para nao criar conflitos
  // pois as opcoes por adicionar nao tem nenhum id ainda
  if(cloneTr.getElementsByTagName('th')[2]){
    if(cloneTr.getElementsByTagName('th')[2].firstChild.getAttribute('hidden') != null){
      cloneTr.getElementsByTagName('th')[2].remove()
    }
  }

  if( cloneTr.getElementsByTagName('th')[1]){
    if(cloneTr.getElementsByTagName('th')[1].firstChild.getAttribute('hidden') != null){
      cloneTr.getElementsByTagName('th')[1].remove()
    }
  }
  // se apagar todos acidentalmente, ao adicionar mais uma resposta se o clone nao tiver o botao, ira criar automaticamente e 
  // adiciona  no final da tr
  if((!newTr[1] && !cloneTr.getElementsByTagName('th')[1]) || (newTr[1] && !cloneTr.getElementsByTagName('th')[2])){
    const th = document.createElement('th');
    cloneTr.appendChild(th)

    const createRB = removeButton()

    th.appendChild(createRB)
  }

  

  lastTr.insertAdjacentElement('afterend', cloneTr)
})

