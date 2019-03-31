import React, { SFC } from 'react';
import styles from './styles.scss';

interface IProps {
    id : string;
    isChecked : boolean;
    clickCheckBox : (id : string) => void;
};

const CheckBox : SFC<IProps> = ({ id, isChecked, clickCheckBox }) => (
    <div className={ styles.checkBox }>
        <input id={ id } className={ styles.check } type="checkbox" checked={ isChecked } onChange={ () => clickCheckBox(id) } />
        <label htmlFor={ id } className={ styles.checkLabel } />
    </div>
);

export default CheckBox;