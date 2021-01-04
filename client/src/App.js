import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import {connect} from "react-redux";


//redux
import actions from "./redux/actions";

// componentes
import BlockPage from "./util/BlockPage";
import NavBar from "./components/NavBar";
import Inicio from "./components/Inicio";
import Questionario from "./components/Questionario";
import Login from "./components/Login";
import Registar from "./components/Registar";
import Resultado from "./components/Resultado";
import Conta from "./components/Conta";
import Footer from "./components/Footer"

// CSS
import classes from "./App.module.css";


function App(props) {
  //test
  // render
  return (
    <div className={classes.app}>
        <NavBar ></NavBar>
        {props.login.showLoginModel && <Login/>}
        <Switch>
        <Route path="/questionario">
          <Questionario></Questionario>
        </Route>
        <BlockPage check={props.questionario.length === 3}  failTo="/questionario/pergunta1" path="/registar" exact>
          <Registar ></Registar>
        </BlockPage>
        <BlockPage check={props.user.token && props.user.id} failTo="/" loginNeeded={true} path="/resultado" exact>
          <Resultado></Resultado>
        </BlockPage>
        <BlockPage check={props.user.token && props.user.id} failTo="/" loginNeeded={true} path="/account" exact>
          <Conta></Conta>
        </BlockPage>
        <Route path="/" exact>
          <Inicio/>
        </Route>
        <Redirect to="/"></Redirect>
        </Switch>
        <Footer></Footer>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

const mapDispatchToProps = (dispatch) => {
  return  {
    cookiesQuestionario:(name, value) => {dispatch(actions.cookiesQuestionario(name, value))},
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
