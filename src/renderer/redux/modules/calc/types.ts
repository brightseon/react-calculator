export const MAKE_EXPRESSION = 'MAKE_EXPRESSION';
export const RESET_EXPRESSION = 'RESET_EXPRESSION';
export const CALCULATE = 'CALCULATE';
export const SET_HISTORY = 'SET_HISTORY';
export const CHANGE_CHECK_VALUE = 'CHANGE_CHECK_VALUE';
export const REMOVE_HISTORY = 'REMOVE_HISTORY';
export const ALL_REMOVE_HISTORY = 'ALL_REMOVE_HISTORY';

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

export interface ChangeCheckValue {
    type : typeof CHANGE_CHECK_VALUE;
    payload : ChangeCheckValueType;
};

export interface RemoveHistoryAction {
    type : typeof REMOVE_HISTORY;
};

export interface AllRemoveHisotryAction {
    type : typeof ALL_REMOVE_HISTORY;
};

interface ExpressionType {
    expression : string;
};

interface CalcResultType {
    calcResult : number;
};

export interface CalcHistoryType {
    id : string;
    expression : string;
    isChecked : boolean;
};

interface HistoryType {
    id : string;
};

interface ChangeCheckValueType {
    id : string;
};