import React, { SFC } from 'react';
import styles from './styles.scss';
import { CalcHistoryType } from '../../redux/modules/calc/types';
import Item from '../Item';
import Button from '../Button';

interface IProps {
    calcHistory : CalcHistoryType[];
};

const HistoryPresenter : SFC<IProps> = ({ calcHistory }) => (
    <div className={ styles.history }>
        <div className={ styles.items }>
            {
                calcHistory.map(history => <Item key={ history.id } history={ history } clickCheckBox={ null } />)
            }
        </div>
        <div className={ styles.buttons }>
            <Button className={ styles.removeBtn } onClick={ null } text="삭제" />
            <Button className={ styles.allRemoveBtn } onClick={ null } text="전체 삭제" />
        </div>
    </div>
);

export default HistoryPresenter;