import {
  Link
} from "react-router-dom";

//redux
import {connect} from 'react-redux';
import actions from '../../redux/actions';

// components
import {ReactComponent as Logo } from '../../images/Logo3.1.svg';

// css
import classes from './NavBar.module.css';

const NavBar = (props) => {


  // Render
  return (
    <>
      <div className={classes.contentor}>
        <Link to='/'><Logo className={classes.logo}></Logo></Link>
        <div className={classes.acesso}>
          <button onClick={()=>props.toogleLoginModel("?=login")}>Login</button>
        </div>
      </div>
    </>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    toogleLoginModel: (urlLogin) => dispatch(actions.toogleLoginModel(urlLogin))
  }
}

export default connect(null,mapDispatchToProps)(NavBar);