import { useState } from 'react';

import classes from './PersonalInfo.module.scss';

import TextInput from '../../util/TextInput/TextInput';
import SelectInput from '../../util/SelectInput/SelectInput';


const PersonalInfo = () => {

  const [checkedInput, setCheckedInput] = useState(false);

  return (
    <div className={classes.Container}>
      <p className={classes.Title}>Antes de começar o questionário, diga-nos o seu nome, género e idade:</p>
      <p className={classes.LittleInfo}>(preencher corretamente para um melhor resultado)</p>
      <TextInput 
        default='Primeiro Nome' 
        checkedValue={setCheckedInput}
      />
      <TextInput
       default='Ultimo Nome' 
       checkedValue={setCheckedInput}
      />
      <SelectInput 
        default='Género' 
        checkedValue={setCheckedInput}
      >
        <option value='Feminino'>Feminino</option>
        <option value='Masculino'>Masculino</option>
      </SelectInput>
    </div>  
  )
}

export default PersonalInfo;