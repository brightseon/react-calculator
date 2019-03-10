import React, { SFC, ChangeEvent } from 'react';
import styles from './styles.scss';
import Button from '../Button';

interface IProps {
    currentExpression : string;
    calculationResult : number;
    lastExpression : string;
    typingExpression : (e : ChangeEvent) => void;
};

const CalcResultPresenter : SFC<IProps> = ({ currentExpression, calculationResult, lastExpression, typingExpression }) => (
    <div className={ styles.calcResultBox }>
        <div className={ styles.lastExpressionBox }>
            <span className={ styles.lastExpression }>{ lastExpression }</span>
        </div>
        <div className={ styles.calcInputBox }>
            <input className={ styles.calcResultInput } type="text" name="calcResult" value={ currentExpression === '' ? calculationResult : currentExpression } onChange={ typingExpression } />
        </div>
        <div className={ styles.btnBox }>
            <Button className={ styles.commonBtn } text={ 'HISTORY' } onClick={ null } />
            <Button className={ styles.commonBtn } text={ 'COPY' } onClick={ null } />
        </div>
    </div>
);

export default CalcResultPresenter;