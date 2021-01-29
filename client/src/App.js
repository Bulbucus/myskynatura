import { createContext, useReducer, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

//Store
import initialState from './store/initialState';
import reducer from './store/reducer';

// Componentes
import Menu from './components/Menu/Menu';
import Inicio from './components/Inicio/Inicio';
import {Questionario} from './components/Questionario/Questionario';
import Resultados from './components/Resultados/Resultados';
import Conta from './components/Conta/Dados/Dados';
import Login from './components/Login/Login';

const LoginContext = createContext()

const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <LoginContext.Provider value={[state, dispatch]}>
      <Router>
        <Menu></Menu>
        <Login></Login>
        <div style={{height:'70px'}}></div>
        <Switch>
          <Route path='/questionario'>
            <Questionario></Questionario>
          </Route>
          <Route path='/resultados'>
            <Resultados></Resultados>
          </Route>
          <Route path='/conta/dados'>
            <Conta></Conta>
          </Route>
          <Route path='/'>
            <Inicio></Inicio>
          </Route>
        </Switch>
      </Router>
    </LoginContext.Provider>
  );
}

export {App, LoginContext};
