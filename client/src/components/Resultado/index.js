import classes from "./Resultado.module.css";
import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import Produto from './Produto';

const Resultado = (props) => {
  const [resultProduto, setResultProduto]= useState([]);

  useEffect( () => {
    fetch(`${
      process.env.NODE_ENV === "production"
        ? process.env.REACT_APP_BACK_END_PROD
        : process.env.REACT_APP_BACK_END_DEV
    }/user/resultados`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      referrerPolicy: "no-referrer",
      credentials: "include",
      body: JSON.stringify({
        id: props.id,
        token: props.token
      })
    })
    .then(data => data.json())
    .then((response) => {
      if(response.status === 200){
          setResultProduto(response.resultado)
      }
    })
  }, [props.id, props.token])

  return (
    <div className={classes.main}>
      <div className={classes.resultado}>Resultados</div>
      <div className={classes.descricao}>Aqui encontrará os produtos mais <br/>apropriados para a sua pele:</div>
      {
      resultProduto.map((produto, index) => { 
        return (<Produto key={index} nome={produto.nome} descricao={produto.descricao} preco={produto.price}></Produto>)
      })
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    id: state.user.id,
    token: state.user.token
  };
};

export default connect(mapStateToProps)(Resultado);