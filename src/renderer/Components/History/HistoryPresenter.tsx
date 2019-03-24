import React, { SFC } from 'react';
import { CalcHistoryType } from '../../redux/modules/calc/types';
import Item from '../Item';
import Button from '../Button';

interface IProps {
    calcHistory : CalcHistoryType[];
};

const HistoryPresenter : SFC<IProps> = ({ calcHistory }) => (
    <div>
        <div>
            {
                calcHistory.map(history => <Item key={ history.id } history={ history } clickCheckBox={ null } />)
            }
        </div>
        <div>
            <Button className={ '' } onClick={ null } text="삭제" />
            <Button className={ '' } onClick={ null } text="전체 삭제" />
        </div>
    </div>
);

export default HistoryPresenter;