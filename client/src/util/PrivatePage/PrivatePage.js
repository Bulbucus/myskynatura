import { useContext, useEffect } from 'react';
import {Redirect, Route} from 'react-router-dom'
import {LoginContext} from '../../App';


const PrivatePage = ({path, children}) => {
  const [loginState, loginDispatch] = useContext(LoginContext)

  useEffect(() => {
    if(!loginState.user.id && !loginState.user.token){
    loginDispatch({type:'toogle_login', boolean:true, text: 'Precisa de fazer login para entrar nesta pagina', path: path})
    }
  }, [loginDispatch, loginState.user.id, loginState.user.token, path]) 

  return (
    <Route path={path}>
    {(!loginState.user.id && !loginState.user.token ) ?
    <Redirect to='/'/> 
    :
    children
    }
    </Route>
  )
}

export default PrivatePage;