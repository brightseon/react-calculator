import React, { SFC } from 'react';
import { CalcHistoryType } from '../../redux/modules/calc/types';

interface IProps {
    history : CalcHistoryType;
    clickCheckBox : (id : string) => void;
};

const Item : SFC<IProps> = ({ history, clickCheckBox }) => (
    <div>
        <input id={ history.id } type="checkbox" onChange={ () => clickCheckBox(history.id) } />
        <label htmlFor={ history.id }>{ history.expression }</label>
    </div>
);

export default Item;