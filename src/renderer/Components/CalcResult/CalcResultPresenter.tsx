import React, { SFC, ChangeEvent, KeyboardEvent, Ref } from 'react';
import styles from './styles.scss';
import Button from '../Button';

interface IProps {
    currentExpression : string;
    calculationResult : number;
    lastExpression : string;
    typingExpression : (e : ChangeEvent) => void;
    enterPress : (e : KeyboardEvent) => void;
    calcResultRef : Ref<HTMLInputElement>;
    copyExpression : () => void;
    lastExpressionRef : Ref<HTMLInputElement>;
    openSidebar : (isSetting : boolean) => void;
};

const CalcResultPresenter : SFC<IProps> = ({ currentExpression, calculationResult, lastExpression, typingExpression, enterPress, calcResultRef, copyExpression, lastExpressionRef, openSidebar }) => (
    <div className={ styles.calcResultBox }>
        <div className={ styles.lastExpressionBox }>
            <input className={ styles.lastExpression } value={ lastExpression } ref={ lastExpressionRef } readOnly />
        </div>
        <div className={ styles.calcInputBox }>
            <input className={ styles.calcResultInput } type="text" name="calcResult" value={ currentExpression === '' ? calculationResult : currentExpression } 
                onChange={ typingExpression } onKeyPress={ enterPress } autoFocus={ true } ref={ calcResultRef } />
        </div>
        <div className={ styles.btnBox }>
            <Button className={ styles.commonBtn } text={ 'HISTORY' } onClick={ () => openSidebar(false) } />
            <Button className={ styles.commonBtn } text={ 'COPY' } onClick={ copyExpression } />
        </div>
    </div>
);

export default CalcResultPresenter;