import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import classes from './Pessoal.module.css'

const Pessoal = () => {

  const [cookies, setCookies] = useCookies()
  let history = useHistory();


  const submitHandler = (event) => {
    event.preventDefault()

    const expiresCookie = new Date()
    expiresCookie.setDate(31)

    setCookies('infoPessoal',
    {
      nome: event.target.nome.value,
      sobreNome: event.target.sobreNome.value,
      idade: event.target.idade.value,
      genero: event.target.genero.value
    }, 
    {
      path: '/',
      expires:expiresCookie
    });
  
    history.push('/questionario/pergunta1')
  }

  return (
  <>
  <div className={classes.containerQuestao}>
    Vamos começar o questionário com algumas perguntas pessoais:
  </div>
  <div className={classes.containerForma}>
    <form id='pessoal' onSubmit={(event) => submitHandler(event)}>
      <label>
        Primeiro Nome:
        <input 
          name='nome' 
          defaultValue={(cookies.infoPessoal && cookies.infoPessoal.nome) || ''} 
          required={true} 
          type='text'/>
      </label>
      <label>Ultimo Nome:
        <input 
          name='sobreNome' 
          defaultValue={(cookies.infoPessoal && cookies.infoPessoal.sobreNome) || ''} 
          required={true} 
          type='text'/>
      </label>
      <label>Idade:
        <input 
          name='idade' 
          defaultValue={(cookies.infoPessoal && cookies.infoPessoal.idade) || ''} 
          required={true} 
          type='date'/>
      </label>
      <label>Genero:
        <select 
          name='genero' 
          defaultValue={(cookies.infoPessoal && cookies.infoPessoal.genero) || ''} 
          required={true}>
            <option value='F'>Feminino</option>
            <option value='M'>Masculino</option>
        </select>
      </label>
    </form>
  </div>
  <div className={classes.containerSeguinte}>
    <label>
      Seguinte Pergunta
      <input 
      style={{display:'none'}} 
      type='submit' 
      form='pessoal'/>
    </label>
  </div>
  </>
  )
}

export default Pessoal;