import classes from './Pergunta.module.scss'

import RadioInput from '../../../../util/RadioInput/RadioInput';

const Pergunta = () => {

  return (
    <div className={classes.box}>
      <div className={classes.TitleBox}>
        <div className={classes.TitlePergunta}>Pergunta 1/10</div>
      </div>
      <div  className={classes.TextPergunta}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis libero sit amet ligula gravida, in porta mauris finibus. Morbi.
      </div>
      <div className={classes.RadioBox}>
        <RadioInput name={'pergunta1'} id={'resposta1'}></RadioInput>
        <label htmlFor={'resposta1'} className={classes.Label}>Lorem ipsum dolor as asjdl asl salfj joaisj lsadfkl çja.</label>
      </div>
      <div className={classes.RadioBox}>
        <RadioInput name={'pergunta1'} id={'resposta2'}></RadioInput>
        <label htmlFor={'resposta2'} className={classes.Label}>Lorem ipsum dolor.</label>
      </div>
      <div className={classes.RadioBox}>
        <RadioInput name={'pergunta1'} id={'resposta3'}></RadioInput>
        <label htmlFor={'resposta3'} className={classes.Label}>Lorem ipsum dolor.</label>
      </div>
    </div>
  )
}

export default Pergunta