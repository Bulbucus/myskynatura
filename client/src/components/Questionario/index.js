import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Pergunta from "./Pergunta";

import classes from "./Questionario.module.css";

const Questionario = () => {

  // Render
  return (
      <div className={classes.ImagemAtras}>
        <Switch>
          <Route path="/questionario/pergunta1" exact>
              <Pergunta
                type="radio"
                numPergunta = "1"
                pergunta="Tem muitas borbulhas?"
                respostas={
                  [
                  {respostaText: "Muitas Borbulhas", respostaName:"muitasBorbulhas"},
                  {respostaText: "Nenhuma borbulha", respostaName:"semBorbulhas"},
                  {respostaText: "Algumas borbulha", respostaName:"algumasBorbulhas"},
                  {respostaText: "Borbulhas na bochecha", respostaName:"bochechaBorbulhas"},
                  ]
                }
              />
          </Route>
          <Route path="/questionario/pergunta2" exact>
            <Pergunta
              type="checkbox"
              numPergunta = "2"
              pergunta="Que tipo de pele têm?"
              respostas={
                [
                {respostaText: "Pele vermelha", respostaName:"peleVermelha"},
                {respostaText: "Pele seca", respostaName:"peleSeca"}
                ]
              }
              />
          </Route>
          <Route path="/questionario/pergunta3" exact>
            <Pergunta
            type="radio"
            numPergunta="3"
            pergunta="Tem rugas?"
            respostas = {
              [
                {respostaText:"Sim", respostaName:"comRugas"},
                {respostaText:"Não", respostaName:"semRugas"}
              ]
            }
            />
          </Route>
          <Redirect to="/registar"></Redirect>
        </Switch>
      </div>
  )
}

export default Questionario;