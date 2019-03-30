import React, { SFC } from 'react';
import styles from './styles.scss';
import Button from '../Button';
import { buttonLabels, CLEAR_BTN, EQUAL_BTN,LabelInfo } from '../../utils/buttonLabels';

interface IProps {
    makeClickFunc : (buttonLabel : LabelInfo) => Function;
    isEmptyExpression : boolean;
};


const CalcButtonPresenter : SFC<IProps> = ({ makeClickFunc, isEmptyExpression }) => (
        <div className={ styles.calcButtonBox }>
            {
                buttonLabels.map(
                    buttonLabel => {
                        const resultClickFunc = makeClickFunc(buttonLabel);

                        return (
                            <Button key={ `${ buttonLabel.labelType }_${ buttonLabel.text }` } className={ styles[buttonLabel.labelType] } 
                                onClick={ () => buttonLabel.labelType !== EQUAL_BTN && buttonLabel.labelType !== CLEAR_BTN  ? resultClickFunc(buttonLabel)(isEmptyExpression && buttonLabel.text === '.' ? '0.' : buttonLabel.text) : resultClickFunc() } 
                                text={ buttonLabel.text } />
                        );
                    }
                )
            }
        </div>
);

export default CalcButtonPresenter;