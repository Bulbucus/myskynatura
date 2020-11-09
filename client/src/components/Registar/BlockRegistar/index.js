import {Redirect, Route} from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const BlockRegistar = ({children, ...rest}) => {

  return (
    <Route {...rest}>
      {(cookies.get('pergunta1') 
      && cookies.get('pergunta2') 
      && cookies.get('pergunta3')) 
      ? children 
      : 
      <Redirect to='/questionario/pergunta1'></Redirect>}
    </Route>
  )
}

export default BlockRegistar;