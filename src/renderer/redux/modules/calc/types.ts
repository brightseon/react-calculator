export const MAKE_EXPRESSION = 'MAKE_EXPRESSION';
export const RESET_EXPRESSION = 'RESET_EXPRESSION';
export const CALCULATE = 'CALCULATE';
export const SET_HISTORY = 'SET_HISTORY';

export interface CalcState {
    currentExpression : string;
    calcHistory : CalcHistoryType[];
    calculationResult : number;
    lastExpression : string;
};

export interface MakeExpressionAction {
    type : typeof MAKE_EXPRESSION;
    payload : ExpressionType;
};

export interface ResetExpressionAction {
    type : typeof RESET_EXPRESSION;
};

export interface CalculateAction {
    type : typeof CALCULATE;
    payload : CalcResultType;
};

export interface SetHistoryAction {
    type : typeof SET_HISTORY;
    payload : HistoryType;
};

interface ExpressionType {
    button? : string;
    expression? : string;
};

interface CalcResultType {
    calcResult : number;
};

export interface CalcHistoryType {
    id : string;
    expression : string;
};

interface HistoryType {
    id : string;
};