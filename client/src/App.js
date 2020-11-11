import { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import BlockRegistar from './components/Registar/BlockRegistar';

import NavBar from './components/NavBar';
import Inicio from './components/Inicio';
import Questionario from './components/Questionario';
import Autenc from './components/Autenc';
import Registar from "./components/Registar";
import Resultado from "./components/Resultado";

import classes from './App.module.css';



// import classes from './App.module.css'

function App() {
  const [showAutenc, setShowAutenc] = useState(false)
  const [typeAutenc, setTypeAutenc] = useState('')

  const autencHandler = (type) => {
    setShowAutenc(!showAutenc)
    setTypeAutenc(type)

    !showAutenc ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'visible'
  }

  return (
    <div className={classes.app}>
      <Router>
        <NavBar autencHandler={autencHandler}></NavBar>
        {showAutenc && <Autenc type={typeAutenc} closeModal={autencHandler}></Autenc>}
        <Switch>
        <Route path='/questionario'>
          <Questionario></Questionario>
        </Route>
        <Route path='/' exact>
          <Inicio/>
        </Route>
        <BlockRegistar path="/registar">
          <Registar></Registar>
        </BlockRegistar>
        <Route path='/resultado' exact>
          <Resultado></Resultado>
        </Route>
        <Redirect to='/'></Redirect>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
