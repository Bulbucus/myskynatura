import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Componentes
import Menu from './components/Menu/Menu';
import Inicio from './components/Inicio/Inicio';
import Questionario from './components/Questionario/Questionario';
import Resultados from './components/Resultados/Resultados';
import Conta from './components/Conta/Dados/Dados';
import Login from './components/Login/Login';



const App = () => {

  const [login, setLogin] = useState(false)

  return (
    <>
      <Router>
        <Menu login={() => setLogin(!login)}></Menu>
        <Login login={login}></Login>
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
    </>
  );
}

export default App;
