import React, { SFC } from 'react';
import CalcButtonPresenter from './CalcButtonPresenter';
import { ButtonType } from '../../store/modules/calc/types';

interface IProps {
    clickButton : (button : number | string) => void;
}

const CalcButtonContainer : SFC<IProps> = ({ clickButton }) => <CalcButtonPresenter clickButton={ clickButton } />

export default CalcButtonContainer;