import { useEffect, useState } from "react";
import { connect } from 'react-redux';

const Resultado = (props) => {

  const [nomeProduct, setNomeProduct] = useState("");

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
      if(response.resultado){setNomeProduct(response.resultado.nome)}
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <p style={{color:"black"}}>{nomeProduct}</p>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    id: state.user.id,
    token: state.user.token
  };
};

export default connect(mapStateToProps)(Resultado);