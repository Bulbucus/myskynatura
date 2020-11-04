import {
  Link
} from "react-router-dom";


import {ReactComponent as Logo } from '../../images/Logo3.1.svg';

import classes from './NavBar.module.css';

const NavBar = (props) => {

  const {autencHandler} = props;


  // Render
  return (
    <>
      <div className={classes.contentor}>
        <Link to='/'><Logo className={classes.logo}></Logo></Link>
        <div className={classes.acesso}>
          <button onClick={() => autencHandler('login')}>Login</button>
          <button onClick={() => autencHandler('registar')}>Registar</button>
        </div>
      </div>
    </>
  )
}

export default NavBar;