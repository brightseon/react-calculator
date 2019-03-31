import React, { SFC } from 'react';
import styles from './styles.scss';
import { CalcHistoryType } from '../../redux/modules/calc/types';
import Item from '../Item';
import Button from '../Button';

interface IProps {
    calcHistory : CalcHistoryType[];
    removeHistory : () => void;
    allRemoveHistory : () => void;
};

const HistoryPresenter : SFC<IProps> = ({ calcHistory, removeHistory, allRemoveHistory }) => (
    <div className={ styles.history }>
        <div className={ styles.items }>
            {
                calcHistory.map(history => <Item key={ history.id } history={ history } isChecked={ history.isChecked } />)
            }
        </div>
        <div className={ styles.buttons }>
            <Button className={ styles.removeBtn } onClick={ removeHistory } text="삭제" />
            <Button className={ styles.allRemoveBtn } onClick={ allRemoveHistory } text="전체 삭제" />
        </div>
    </div>
);

export default HistoryPresenter;