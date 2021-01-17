import { useState } from 'react';

import classes from './PersonalInfo.module.scss';

import TextInput from '../../util/TextInput/TextInput';
import {SelectInput, Option} from '../../util/SelectInput/SelectInput';
import DateInput from '../../util/DateInput/DateInput';


const PersonalInfo = () => {

  const [, setCheckedInput] = useState(false);

  return (
    <div className={classes.Container}>
      <p className={classes.Title}>Antes de começar o questionário, diga-nos o seu nome, género e idade:</p>
      <p className={classes.LittleInfo}>(preencher corretamente para um melhor resultado)</p>
      <TextInput 
        default='Primeiro Nome' 
        name='PrimeiroNome'
        checkedValue={setCheckedInput}
        showIcon={true}
        errorMessage={true}
      />
      <TextInput
       default='Ultimo Nome' 
       name='UltimoNome'
       checkedValue={setCheckedInput}
       showIcon={true}
       errorMessage={true}
      />
      <SelectInput 
        default='Género' 
        checkedValue={setCheckedInput}
        name='Genero'
        showIcon={true}
        errorMessage={true}
      >
        <Option value='Masculino'>Masculino</Option>
        <Option value='Feminino'>Feminino</Option>
      </SelectInput>
    </div>  
  )
}

export default PersonalInfo;