import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Pessoal from './pessoal';
import PerguntaMultiResposta from './PerguntaMultiResposta';
import PerguntaUnicaResposta from './PerguntaUnicaResposta';

import classes from './Questionario.module.css';

const Questionario = () => {

  return (
    <Router>
      <div className={classes.ImagemAtras}>
        <Switch>
          <Route path='/questionario/pessoal' exact>
            <Pessoal></Pessoal>
          </Route>
          <Route path='/questionario/pergunta2' exact>
            <PerguntaMultiResposta
              numPergunta = 'pergunta1'
              pergunta='Tipo de pele'
              respostas={
                [
                {respostaText: 'Pele vermelha', respostaName:'peleVermelha'},
                {respostaText: 'Pele seca', respostaName:'peleSeca'}
                ]
              }
            ></PerguntaMultiResposta>
          </Route>
          <Route path='/questionario/pergunta1' exact>
              <PerguntaUnicaResposta
                numPergunta = 'pergunta1'
                pergunta='Muitas borbulhas'
                respostas={
                  [
                  {respostaText: 'Borbulhas', respostaName:'borbulhas'},
                  {respostaText: 'Nenhuma borbulha', respostaName:'semBorbulhas'}
                  ]
                }
              >
              </PerguntaUnicaResposta>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default Questionario;