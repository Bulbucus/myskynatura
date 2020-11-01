import {
  Link
} from "react-router-dom";


import {ReactComponent as Logo } from '../../images/Logo3.1.svg';

import classes from './NavBar.module.css';

const NavBar = () => {

  return (
    <>
      <div className={classes.contentor}>
        <Link to='/'><Logo className={classes.logo}></Logo></Link>
        <div className={classes.acesso}>
          <Link to='/login' >Login</Link>
          <Link to='/registar'>Registar</Link>
        </div>
      </div>
    </>
  )
}

export default NavBar;