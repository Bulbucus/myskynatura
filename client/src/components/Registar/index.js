import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import classes from './Registar.module.css'

const Registar = () => {
  // State
  const [cookies, setCookies] = useCookies()
  let history = useHistory();
  const defaultIdade = new Date().toISOString()

  // Handler
  const submitHandler = (event) => {
    event.preventDefault()
  }

  return (
    <div className={classes.ImagemAtras}>
  <div className={classes.containerQuestao}>
    Registo
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
          defaultValue={(cookies.infoPessoal && cookies.infoPessoal.idade) || `${defaultIdade.substr(0,10)}`} 
          required={true} 
          type='date'

          />
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
      <label>
            Email:
          </label>
            <input type='email' name='email' className={classes.email}/>
          <label>
            Password:
          </label>
          <input type='password' name='password' className={classes.password}></input>
          <label>
            Confirm Password:
          </label>
          <input type='password' name='confirmePassword' className={classes.password}></input>
    </form>
  </div>
    <label className={classes.containerSeguinte}>
      Fazer Registo
      <input 
      style={{display:'none'}} 
      type='submit' 
      form='pessoal'/>
    </label>
  </div>
  )
}

export default Registar;