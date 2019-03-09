import { MAKE_EXPRESSION, CalcState, MakeExpressionAction, RESET_EXPRESSION, ResetExpressionAction, CALCULATE, CalculateAction } from './types';

export const makeExpression = (button : number | string) : MakeExpressionAction => {
    return {
        type : MAKE_EXPRESSION,
        payload : {
            button
        }
    };
};

export const resetExpression = () : ResetExpressionAction => {
    return {
        type : RESET_EXPRESSION
    };
};

export const calculate = () : CalculateAction => {
    return {
        type : CALCULATE
    };
};

const initialState : CalcState = {
    currentExpression : '',
    calcHistory : [],
    calculationResult : 0
};

const reducer = (state : CalcState = initialState, action : MakeExpressionAction | ResetExpressionAction | CalculateAction) : CalcState => {
    switch (action.type) {
        case MAKE_EXPRESSION :
            return setCurrentExpression(state, action);

        case RESET_EXPRESSION : 
            return resetCurrentExpression(state, action);

        case CALCULATE :
            return calculateExpression(state, action);
        
        default :
            return initialState;
    }
};

const setCurrentExpression = (state : CalcState, action : MakeExpressionAction) : CalcState => {
    return {
        ...state,
        currentExpression : state.currentExpression + action.payload.button
    };
};

const resetCurrentExpression = (state : CalcState, action : ResetExpressionAction) : CalcState => {
    return {
        ...state,
        currentExpression : ''
    };
};

const calculateExpression = (state : CalcState, action : CalculateAction) : CalcState => {
    return {
        ...state,
        currentExpression : ''
    };
};

export default reducer;