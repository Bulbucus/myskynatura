import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import {LoginContext} from './context/login';

//import hook
import {useLoginHandler} from './hooks/login';

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

function App() {

  const {showAutenc, preMessage, loginChanges} = useLoginHandler();

  // render
  return (
    <LoginContext.Provider
    value={{
    preMessage:preMessage,
    showAutenc: showAutenc,
    loginChanges: loginChanges,
    }}
    >
    <div className={classes.app}>
        <NavBar ></NavBar>
        {showAutenc && <Login/>}
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
   </LoginContext.Provider>
  );
}

export default App;
