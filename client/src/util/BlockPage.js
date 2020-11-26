import {Redirect, Route} from 'react-router-dom';
import {connect} from 'react-redux';

//actions
import actions from '../redux/actions';

const BlockPage = ({children, ...rest}) => {

  return (
    <Route {...rest}>
      {(rest.check)
      ? children 
      : 
      <Redirect to={rest.failTo}>
        {rest.loginNeeded && rest.toogleLoginModel(true,"Necessita de fazer o login para aceder a pagina", rest.path)}
      </Redirect>}
    </Route>
  )
}

const mapDispatchToProps = (dispatch) => {
    return {
        toogleLoginModel: (boolean,text,path) => {dispatch(actions.toogleLoginModel(boolean,text,path))}
    }
}

export default connect(null,mapDispatchToProps)(BlockPage);