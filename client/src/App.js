import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
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
        <Route path='/questionario/'>
          <Questionario></Questionario>
        </Route>
        <Route path='/' exact>
          <Inicio></Inicio>
        </Route>
        <Redirect to='/'></Redirect>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
