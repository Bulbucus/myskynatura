import classes from './PersonalInfo.module.scss';

import TextInput from '../../../util/TextInput/TextInput';
import {SelectInput, DefaultMessage, Options, Option} from '../../../util/SelectInput/SelectInput';
import DateInput from '../../../util/DateInput/DateInput';


const PersonalInfo = () => {

  return (
    <div className={classes.container}>
      <p className={classes.title}>Antes de começar o questionário, diga-nos o seu nome, género e idade:</p>
      <p className={classes.LittleInfo}>(preencher corretamente para um melhor resultado)</p>
      <TextInput type='text' defaultValue='Primeiro Nome' name='PrimeiroNome'/>
      <TextInput type='text' defaultValue='Ultimo Nome' name='UltimoNome'/>
      <div className={classes.Select}>
        <SelectInput name='Genero'>
          <DefaultMessage  defaultValue='Género'/>
          <Options>
            <Option value='Masculino'>Masculino</Option>
            <Option value='Feminino'>Feminino</Option>
          </Options>
        </SelectInput>
      </div>
      <div className={classes.TitleDate}>Aniversario</div>
      <DateInput></DateInput>
    </div>  
  )
}

export default PersonalInfo;