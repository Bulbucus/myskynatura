import {ReactComponent as Logo } from '../../images/Logo3.1.svg';

import classes from './NavBar.module.css';

const NavBar = () => {

  return (
    <>
      <div className={classes.contentor}>
        <Logo className={classes.logo}></Logo>
        <div className={classes.acesso}>
          <a href='/login' >Login</a>
          <a href='/registar'>Registar</a>
        </div>
      </div>
    </>
  )
}

export default NavBar;