import React, { SFC } from 'react';
import { CalcHistoryType } from '../../redux/modules/calc/types';
import styles from './styles.scss';
import CheckBox from '../CheckBox';

interface IProps {
    history : CalcHistoryType;
    clickCheckBox : (id : string) => void;
};

const Item : SFC<IProps> = ({ history, clickCheckBox }) => (
    <div className={ styles.item }>
        <CheckBox id={ history.id } />
        <label className={ styles.expression } htmlFor={ history.id }>{ history.expression }</label>
    </div>
);

export default Item;