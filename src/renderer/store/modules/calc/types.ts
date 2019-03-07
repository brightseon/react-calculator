export const MAKE_EXPRESSION = 'MAKE_EXPRESSION';

export interface CalcState {
    currentExpression : string;
    calcHistory : object[];
};

export interface MakeExpressionAction {
    type : typeof MAKE_EXPRESSION,
    payload : string | number;
};