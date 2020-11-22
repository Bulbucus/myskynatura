import { useContext } from "react";
import {
  Link
} from "react-router-dom";

import {LoginContext} from '../../context/login';

import {ReactComponent as Logo } from '../../images/Logo3.1.svg';

import classes from './NavBar.module.css';

const NavBar = () => {

  const {loginChanges} = useContext(LoginContext);

  // Render
  return (
    <>
      <div className={classes.contentor}>
        <Link to='/'><Logo className={classes.logo}></Logo></Link>
        <div className={classes.acesso}>
          <button onClick={loginChanges}>Login</button>
        </div>
      </div>
    </>
  )
}

export default NavBar;