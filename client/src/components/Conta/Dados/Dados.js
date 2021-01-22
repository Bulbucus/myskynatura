import classes from './Dados.module.scss';

import TextInput from '../../../util/TextInput/TextInput';
import {SelectInput, DefaultMessage, Options, Option} from '../../../util/SelectInput/SelectInput';
import DateInput from '../../../util/DateInput/DateInput'; 

const Dados = () => {

    return (
      <>
        <div>
          <button className={classes.Title}>Meus Dados</button>
          <div className={classes.box}>
            <p className={classes.Description}>Primeiro Nome</p>
            <TextInput type='text' value='Emanuel'></TextInput>
            <p className={classes.Description}>Ultimo Nome</p>
            <TextInput type='text' value='Farinha'></TextInput>
            <p className={classes.Description}>Género</p>
            <SelectInput className={classes.SelectInput}>
              <DefaultMessage value='Masculino'>Masculino</DefaultMessage>
              <Options>
                <Option value='Feminino'>Feminino</Option>
                <Option value='Masculino'>Masculino</Option>
              </Options>
            </SelectInput>
            <p className={classes.TitleDate}>Aniversario</p>
            <DateInput day='01' month='01' year='1998'></DateInput>
            <div className={classes.separador}></div>
            <button className={classes.button}>Editar dados</button>
          </div>
        </div>
      </>
    )
}
  
export default Dados;