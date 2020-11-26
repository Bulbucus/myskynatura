import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import {connect} from 'react-redux';
import { Cookies } from 'react-cookie';

//redux
import actions from './redux/actions';

// componentes
import BlockPage from './util/BlockPage';
import NavBar from './components/NavBar';
import Inicio from './components/Inicio';
import Questionario from './components/Questionario';
import Login from './components/Login';
import Registar from "./components/Registar";
import Resultado from "./components/Resultado";
import Conta from './components/Conta';

// CSS
import classes from './App.module.css';
import { useEffect } from "react";

function App(props) {

  const cookies = new Cookies().getAll();

  useEffect(() => {
    if(cookies.pergunta1|| cookies.pergunta2|| cookies.pergunta3) {

    props.cookiesQuestionario("pergunta1", cookies.pergunta1.resposta)
    props.cookiesQuestionario("pergunta2", cookies.pergunta2.resposta)
    props.cookiesQuestionario("pergunta3", cookies.pergunta3.resposta)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  // render
  return (
    <div className={classes.app}>
        <NavBar ></NavBar>
        {props.login.showLoginModel && <Login/>}
        <Switch>
        <Route path='/questionario'>
          <Questionario></Questionario>
        </Route>
        <BlockPage check={cookies.pergunta3}  failTo="/questionario/pergunta1" path="/registar" exact>
          <Registar ></Registar>
        </BlockPage>
        <Route path='/resultado' exact>
          <Resultado></Resultado>
        </Route>
        <BlockPage check={props.user.token} failTo="/" loginNeeded={true} path="/account" exact>
          <Conta></Conta>
        </BlockPage>
        <Route path='/' exact>
          <Inicio/>
        </Route>
        <Redirect to='/'></Redirect>
        </Switch>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

const mapDispatchToProps = (dispatch) => {
  return  {
    cookiesQuestionario:(name, value) => {dispatch(actions.cookiesQuestionario(name, value))},
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
