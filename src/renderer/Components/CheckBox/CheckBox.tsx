import React, { SFC } from 'react';
import styles from './styles.scss';

interface IProps {
    id : string;
};

const CheckBox : SFC<IProps> = ({ id }) => (
    <div className={ styles.checkBox }>
        <input id={ id } className={ styles.check } type="checkbox" />
        <label htmlFor={ id } className={ styles.checkLabel } />
    </div>
);

export default CheckBox;