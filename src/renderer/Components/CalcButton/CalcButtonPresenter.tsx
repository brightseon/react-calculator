import React, { SFC } from 'react';
import styles from './styles.scss';
import Button from '../Button';
import { buttonLabels, CLEAR_BTN, EQUAL_BTN,LabelInfo } from '../../utils/buttonLabels';

interface IProps {
    makeExpression : (button : number | string) => void;
    resetExpression : () => void;
    calculate : () => void;
};


const CalcButtonPresenter : SFC<IProps> = ({ makeExpression, resetExpression, calculate }) => {
    const makeClickFunc = (buttonLabel : LabelInfo) : Function => {
        let returnClickFunc : Function;
        
        switch(buttonLabel.labelType) {
            case CLEAR_BTN :
                return returnClickFunc = resetExpression;
            
            case EQUAL_BTN :
                return returnClickFunc = calculate;

            default :
                return returnClickFunc = makeExpression;
        }
    };

    return (
        <div className={ styles.calcButtonBox }>
            {
                buttonLabels.map(
                    buttonLabel => 
                        <Button key={ `${ buttonLabel.labelType }_${ buttonLabel.text }` } className={ styles[buttonLabel.labelType] } 
                            onClick={ () => buttonLabel.labelType !== EQUAL_BTN && buttonLabel.labelType !== CLEAR_BTN ? makeClickFunc(buttonLabel)(buttonLabel.text) : makeClickFunc(buttonLabel)() } 
                            text={ buttonLabel.text } />
                )
            }
        </div>
    );
};

export default CalcButtonPresenter;