import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Componentes
import Menu from './components/Menu/Menu';
import Inicio from './components/Inicio/Inicio';
import Questionario from './components/Questionario/Questionario';

const App = () => {
  return (
    <>
      <Router>
        <Menu></Menu>
        <div style={{height:'70px'}}></div>
        <Switch>
          <Route path='/questionario'>
            <Questionario></Questionario>
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
