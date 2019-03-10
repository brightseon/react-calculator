import { MAKE_EXPRESSION, CalcState, MakeExpressionAction, RESET_EXPRESSION, ResetExpressionAction, CALCULATE, CalculateAction } from './types';
import calculateUtil from '../../../utils/calculate';

export const makeExpression = (button? : number | string, typingExpression? : number | string) : MakeExpressionAction => {
    if(button) {
        return {
            type : MAKE_EXPRESSION,
            payload : {
                button : typeof button !== 'string' ? button.toString() : button
            }
        };
    } else {
        return {
            type : MAKE_EXPRESSION,
            payload : {
                expression : typeof typingExpression !== 'string' ? typingExpression.toString() : typingExpression
            }
        }
    }
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
    calculationResult : 0,
    lastExpression : ''
};

const reducer = (state : CalcState = initialState, action : MakeExpressionAction | ResetExpressionAction | CalculateAction) : CalcState => {
    switch (action.type) {
        case MAKE_EXPRESSION :
            return setCurrentExpression(state, action);

        case RESET_EXPRESSION : 
            return resetCurrentExpression(state);

        case CALCULATE :
            return calculateExpression(state, action);
        
        default :
            return initialState;
    }
};

const setCurrentExpression = (state : CalcState, action : MakeExpressionAction) : CalcState => {
    return {
        ...state,
        currentExpression : action.payload.expression ? action.payload.expression : state.currentExpression + action.payload.button
    };
};

const resetCurrentExpression = (state : CalcState) : CalcState => {
    return {
        ...state,
        currentExpression : '',
        lastExpression : '',
        calculationResult : 0
    };
};

const calculateExpression = (state : CalcState, action : CalculateAction) : CalcState => {
    return {
        ...state,
        currentExpression : '',
        lastExpression : state.currentExpression,
        calculationResult : calculateUtil(state.currentExpression)
    };
};

export default reducer;