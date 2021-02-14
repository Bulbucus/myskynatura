import { useContext,useEffect, useState } from 'react';
import axios from 'axios';

import {LoginContext} from '../../App';

import classes from './Resultados.module.scss';

import Produto from './Produto/Produto';
import { ErrorMessage } from '../../util/ErrorHandler/ErrorHandler';

import checkEnv from '../../production/checkEnv'

const Resultados = () => {

  const [state] = useContext(LoginContext)
  const [produtos, setProdutos] = useState([])

  useEffect(() => { 
    axios.post(checkEnv() + '/api/user/resultados',
    {
      id:state.user.id,
      token:state.user.token
    }).then((response) => {
      const {resultado} = response.data

      if(resultado.length > 0){
        resultado.forEach((element, index) => {
          setProdutos(produto => [produto, <Produto key={index} nome={element.nome} descricao={element.descricao} price={element.price}></Produto>])
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