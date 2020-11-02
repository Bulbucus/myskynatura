import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import NavBar from './components/NavBar';
import Inicio from './components/Inicio';
import Questionario from './components/Questionario';

// import classes from './App.module.css'

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar></NavBar>
        <Switch>
        <Route path='/questionario/pessoal' exact>
            <Questionario></Questionario>
          </Route>
          <Route path='/'>
            <Inicio></Inicio>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
