import {Link} from 'react-router-dom';
import {ReactComponent as Logo}  from '../../assets/Logo3.1.svg';

//CSS
import classes from './Menu.module.scss';

const Menu = () => {
  return (
    <div className={classes.Menu}>
      <div className={classes.Navbar}>
        <Link to='/'>
          <Logo className={classes.Logo}></Logo>
        </Link>
        <button className={classes.Login}>Login</button>
      </div>
      <span className={classes.Line}></span>
    </div>
  )
}

export default Menu;