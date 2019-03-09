export const MAKE_EXPRESSION = 'MAKE_EXPRESSION';
export const RESET_EXPRESSION = 'RESET_EXPRESSION';
export const CALCULATE = 'CALCULATE';

export interface CalcState {
    currentExpression : string;
    calcHistory : object[];
    calculationResult : number
};

export interface MakeExpressionAction {
    type : typeof MAKE_EXPRESSION;
    payload : ButtonType;
};

export interface ResetExpressionAction {
    type : typeof RESET_EXPRESSION;
};

export interface CalculateAction {
    type : typeof CALCULATE;
};

interface ButtonType {
    button : number | string;
}