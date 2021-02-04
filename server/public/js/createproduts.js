let number = 1;

const elementClick = document.getElementById('add_opcao')

elementClick.addEventListener('click', () => {
  const createInputOpcao = document.createElement('input');

  const createLabelOpcao = document.createElement('label');
  createLabelOpcao.setAttribute('id', `label_opcao[${number}]`)

  const span = document.createElement('span');
  span.setAttribute('style', 'display:block; height:3px');
  span.setAttribute('id', `break_${number}`);

  document.getElementById(`id_opcao[${number-1}]`).insertAdjacentElement('afterend',span);
  document.getElementById(`break_${number}`).appendChild(document.createElement('br'));
  document.getElementById(`break_${number}`).insertAdjacentElement('afterend',createLabelOpcao);
  document.getElementById(`label_opcao[${number}]`).insertAdjacentElement('afterend',createInputOpcao);

  
  createLabelOpcao.innerText = `Tag ${number+1} `
  createInputOpcao.setAttribute('type', 'text');
  createInputOpcao.setAttribute('name', `id_opcao[${number}]`);
  createInputOpcao.setAttribute('id', `id_opcao[${number}]`);

  number = number + 1;

})