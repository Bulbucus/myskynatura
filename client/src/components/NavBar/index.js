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
          { props.user.token ?
          <Link to='/account'>
            <button>Minha conta</button>
          </Link>
          :
          <button onClick={()=>props.toogleLoginModel(true)}>Login</button>
          } 
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toogleLoginModel: (boolean) => dispatch(actions.toogleLoginModel(boolean))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(NavBar);