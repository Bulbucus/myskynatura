import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import {connect} from 'react-redux';

// componentes
import BlockRegistar from './components/Registar/BlockRegistar';
import NavBar from './components/NavBar';
import Inicio from './components/Inicio';
import Questionario from './components/Questionario';
import Login from './components/Login';
import Registar from "./components/Registar";
import Resultado from "./components/Resultado";

// CSS
import classes from './App.module.css';

function App({login}) {

  

  // render
  return (
    <div className={classes.app}>
        <NavBar ></NavBar>
        {login.showLoginModel && <Login/>}
        <Switch>
        <Route path='/questionario'>
          <Questionario></Questionario>
        </Route>
        <BlockRegistar path="/registar" exact>
          <Registar ></Registar>
        </BlockRegistar>
        <Route path='/resultado' exact>
          <Resultado></Resultado>
        </Route>
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

export default connect(mapStateToProps)(App);
