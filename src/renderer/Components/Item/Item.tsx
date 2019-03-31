import React, { SFC } from 'react';
import { CalcHistoryType } from '../../redux/modules/calc/types';
import styles from './styles.scss';
import CheckBox from '../CheckBox';

interface IProps {
    history : CalcHistoryType;
    isChecked : boolean;
};

const Item : SFC<IProps> = ({ history, isChecked }) => (
    <div className={ styles.item }>
        <CheckBox id={ history.id } isChecked={ isChecked } />
        <label className={ styles.expression } htmlFor={ history.id }>{ history.expression }</label>
    </div>
);

export default Item;