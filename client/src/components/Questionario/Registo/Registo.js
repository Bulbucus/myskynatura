import classes from './Registo.module.scss';

import TextInput from '../../../util/TextInput/TextInput'

const Registo = () => {

  return (
    <>
    <div className={classes.container}>
      <p className={classes.title}>Para acabar o questionário precisa de criar uma conta no nosso site:</p>
      <TextInput type='email' defaultValue="Email"></TextInput>
      <TextInput type='password' defaultValue="Password"></TextInput>
      <TextInput type='password' defaultValue="Confirmar Password"></TextInput>
    </div>
    </>
  )

}

export default Registo;