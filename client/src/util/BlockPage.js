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
        {rest.loginNeeded && rest.toogleLoginModel(true,"Necessita de fazer o login para aceder a pagina")}
      </Redirect>}
    </Route>
  )
}

const mapDispatchToProps = (dispatch) => {
    return {
        toogleLoginModel: (boolean,text) => {dispatch(actions.toogleLoginModel(boolean,text))}
    }
}

export default connect(null,mapDispatchToProps)(BlockPage);