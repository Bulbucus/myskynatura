import { useContext,useEffect, useState } from 'react';
import axios from 'axios';

import {LoginContext} from '../../App';

import classes from './Resultados.module.scss';

import Produto from './Produto/Produto';
import { ErrorMessage } from '../../util/ErrorHandler/ErrorHandler';

const Resultados = () => {

  const [state, dispatch] = useContext(LoginContext)
  const [produtos, setProdutos] = useState([])

  useEffect(() => { 
    axios.post('http://95.93.159.118:8888/user/resultados',
    {
      id:state.user.id,
      token:state.user.token
    }).then((response) => {
      const {resultado} = response.data

      if(resultado.length > 0){
        resultado.forEach((element) => {
          setProdutos(produto => [produto, <Produto nome={element.nome} descricao={element.descricao} price={element.price}></Produto>])
        })
      } else {
        setProdutos(<ErrorMessage errorMessage='Lamentamos mas de momento não encontramos nenhum produto para o seu tipo de pele.'></ErrorMessage>)
      }
      
    })

  },[state.user.id, state.user.token])


  return(
    <>
    <div className={classes.container}>
      <div className={classes.title}>Os melhores produtos para si são:</div>
    </div>
    {produtos}
    </>
  )
};

export default Resultados