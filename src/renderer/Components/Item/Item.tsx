import React, { SFC } from 'react';
import { CalcHistoryType } from '../../redux/modules/calc/types';
import styles from './styles.scss';

interface IProps {
    history : CalcHistoryType;
    clickCheckBox : (id : string) => void;
};

const Item : SFC<IProps> = ({ history, clickCheckBox }) => (
    <div className={ styles.item }>
        <input className={ styles.checkBox } id={ history.id } type="checkbox" onChange={ () => clickCheckBox(history.id) } />
        <label className={ styles.expression } htmlFor={ history.id }>{ history.expression }</label>
    </div>
);

export default Item;