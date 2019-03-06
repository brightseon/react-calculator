export const CLICK_BUTTON = 'CLICK_BUTTON';

export interface CalcState {
    currentExpression : string;
    calcHistory : object[];
};

export interface ClickAction {
    type : typeof CLICK_BUTTON,
    payload : string | number;
};

export interface ButtonType {
    button : number | string;
};