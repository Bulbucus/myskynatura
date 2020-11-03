import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Pessoal from './Pessoal';
import Pergunta from './Pergunta';

import classes from './Questionario.module.css';

const Questionario = () => {

  return (
      <div className={classes.ImagemAtras}>
        <Switch>
          <Route path='/questionario/pessoal'>
            <Pessoal></Pessoal>
          </Route>
          <Route path='/questionario/pergunta1'>
              <Pergunta
                type='radio'
                numPergunta = 'pergunta1'
                pergunta='Tem muitas borbulhas?'
                respostas={
                  [
                  {respostaText: 'Muitas Borbulhas', respostaName:'muitasBorbulhas'},
                  {respostaText: 'Nenhuma borbulha', respostaName:'semBorbulhas'},
                  {respostaText: 'Algumas borbulha', respostaName:'algumasBorbulhas'},
                  {respostaText: 'Borbulhas na bochecha', respostaName:'bochechaBorbulhas'},
                  ]
                }
              />
          </Route>
          <Route path='/questionario/pergunta2'>
            <Pergunta
              type='checkbox'
              numPergunta = 'pergunta2'
              pergunta='Que tipo de pele têm?'
              respostas={
                [
                {respostaText: 'Pele vermelha', respostaName:'peleVermelha'},
                {respostaText: 'Pele seca', respostaName:'peleSeca'}
                ]
              }
              />
          </Route>
          <Route path='/questionario/pergunta3'>
            <Pergunta
            type='radio'
            numPergunta='pergunta3'
            pergunta='Tem rugas?'
            respostas = {
              [
                {respostaText:'Sim', respostaName:'S'},
                {respostaText:'Não', respostaName:'N'}
              ]
            }
            />
          </Route>
          <Redirect to='/'></Redirect>
        </Switch>
      </div>
  )
}

export default Questionario;