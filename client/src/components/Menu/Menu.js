import { useContext } from 'react';
import {Link} from 'react-router-dom';
import {ReactComponent as Logo}  from '../../assets/Logo3.1.svg';

import {LoginContext} from '../../App';

//CSS
import classes from './Menu.module.scss';


const Menu = () => {

  const [state, dispatch] = useContext(LoginContext);

  return (
    <div className={classes.Menu}>
      <div className={classes.Navbar}>
        <Link to='/'>
          <Logo className={classes.Logo}></Logo>
        </Link>
        <button className={classes.loginButton} onClick={() => {dispatch({type:'toogle_login', boolean:true, text:''})}}>Login</button>
        <Link to='/conta/dados'>Conta</Link>
      </div>
      <span className={classes.line}></span>
    </div>
  )
}

export default Menu;