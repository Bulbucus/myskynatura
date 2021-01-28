import classes from './Pergunta.module.scss'

import RadioInput from '../../../../util/RadioInput/RadioInput';

const Pergunta = (props) => {

  //Cada pergunta cria automaticamente os RadiosInput necessarios
  return (
    <div className={classes.box} name={`pergunta${props.index}`}>
      <div className={classes.TitleBox}>
        <div className={classes.TitlePergunta}>Pergunta {props.index+1}</div>
      </div>
      <div className={classes.TextPergunta}>
        {props.pergunta}
      </div>
      {props.respostas.map((respostas, index) => {
        return (
        <div className={classes.RadioBox} key={respostas}>
          <RadioInput type={props.type} name={props.name} id={props.id[index]} onClick={(event) => {props.onClick(event)}}></RadioInput>
          <label htmlFor={props.id[index]} className={classes.Label}>{respostas}</label>
        </div>
        )
      })}
    </div>
  )
}

export default Pergunta