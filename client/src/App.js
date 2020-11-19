import { useState } from "react";
import {
  Switch,
  Route,
  Redirect,
  useHistory
} from "react-router-dom";
import BlockRegistar from './components/Registar/BlockRegistar';

import NavBar from './components/NavBar';
import Inicio from './components/Inicio';
import Questionario from './components/Questionario';
import Login from './components/Login';
import Registar from "./components/Registar";
import Resultado from "./components/Resultado";

import classes from './App.module.css';
import { useEffect } from "react";

function App() {
  const [showAutenc, setShowAutenc] = useState(false)
  const history = useHistory();

  const loginHandler = () => {
    setShowAutenc(!showAutenc)
    !showAutenc ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'visible'
    !showAutenc ? history.push("?=login") : history.goBack();
  }

  useEffect(() => {
    console.log(history);
    history.location.search === '?=login' && loginHandler();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history])


  return (
    <div className={classes.app}>
        <NavBar loginHandler={loginHandler}></NavBar>
        {showAutenc && <Login closeModal={loginHandler}/>}
        <Switch>
        <Route path='/questionario'>
          <Questionario></Questionario>
        </Route>
        <BlockRegistar path="/registar" exact>
          <Registar></Registar>
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

export default App;
