import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import classes from './Questionario.module.css'

const Pessoal = () => {

  const [cookies, setCookies] = useCookies()
  let history = useHistory();


  const submitHandler = (event) => {
    const {target} = event
    event.preventDefault()
    setCookies('infoPessoal',
    {
      nome: target.nome.value,
      sobreNome: target.sobreNome.value,
      idade: target.idade.value,
      genero: target.genero.value
    }, 
    {path: '/'});
    history.push('/questionario/pergunta1')
  }

  return (
  <>
  <div className={classes.containerQuestao}>
    Vamos começar o questionário com algumas perguntas pessoais:
  </div>
  <div className={classes.containerForma}>
    <form id='pessoal' onSubmit={(event) => submitHandler(event)}>
      <label>Primeiro Nome:
      <input name='nome' defaultValue={cookies.infoPessoal.nome} type='text'></input>
      </label>
      <label>Ultimo Nome:
      <input name='sobreNome' defaultValue={cookies.infoPessoal.sobreNome} type='text'></input>
      </label>
      <label>Idade:
      <input name='idade' defaultValue={cookies.infoPessoal.idade} type='date'></input>
      </label>
      <label>Genero:
      <select name='genero' defaultValue={cookies.infoPessoal.genero}>
        <option value='F'>Feminino</option>
        <option value='M'>Masculino</option>
      </select>
      </label>
    </form>
  </div>
  <div className={classes.containerSeguinte}>
    <label>
      Seguinte Pergunta
    <input style={{display:'none'}} type='submit' form='pessoal'></input>
    </label>
  </div>
  </>
  )
}

export default Pessoal;