import { useState, useEffect } from "react";
import {
  Switch,
  Route,
  Redirect,
  useHistory
} from "react-router-dom";

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
  //state
  const [showAutenc, setShowAutenc] = useState(false)
  const [preMessageLogin, setPreMessageLogin] = useState('');
  // history
  const history = useHistory();

  //handler login
  const loginHandler = (preMessage) => {
    setShowAutenc(!showAutenc)
    setPreMessageLogin(preMessage)
    !showAutenc ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'visible'
    !showAutenc ? history.push({search:"?=login"}) : history.push({search:""});
  }

  //useEffect
  useEffect(() => {
    history.location.search === '?=login' && loginHandler();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history])

  // render
  return (
    <div className={classes.app}>
        <NavBar loginHandler={loginHandler}></NavBar>
        {showAutenc && <Login preMessage={preMessageLogin} closeModal={loginHandler}/>}
        <Switch>
        <Route path='/questionario'>
          <Questionario></Questionario>
        </Route>
        <BlockRegistar path="/registar" exact>
          <Registar loginHandler={loginHandler} ></Registar>
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
