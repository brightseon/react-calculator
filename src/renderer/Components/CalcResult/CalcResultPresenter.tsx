import React, { SFC } from 'react';
import styles from './styles.scss';
import Button from '../Button';

interface IProps {
    currentExpression : string;
};

const CalcResultPresenter : SFC = () => {
    return (
        <div className={ styles.calcResultBox }>
            <div className={ styles.calcInputBox }>
                <input className={ styles.calcResultInput } type="text" name="calcResult" />
            </div>
            <div className={ styles.btnBox }>
                <Button className={ styles.commonBtn } text={ 'HISTORY' } onClick={ null } />
                <Button className={ styles.commonBtn } text={ 'COPY' } onClick={ null } />
            </div>
        </div>
    );
}

export default CalcResultPresenter;