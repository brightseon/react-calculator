import { MAKE_EXPRESSION, CalcState, MakeExpressionAction, RESET_EXPRESSION, ResetExpressionAction, CALCULATE, CalculateAction, SET_HISTORY, SetHistoryAction } from './types';
import { makeUniqueId } from '../../../utils/commons';

export const makeExpression = (button? : string, typingExpression? : string) : MakeExpressionAction => {
    if(button) {
        return {
            type : MAKE_EXPRESSION,
            payload : {
                button : button
            }
        };
    } else {
        return {
            type : MAKE_EXPRESSION,
            payload : {
                expression : typingExpression
            }
        }
    }
};

export const resetExpression = () : ResetExpressionAction => {
    return {
        type : RESET_EXPRESSION
    };
};

export const calculate = (calcResult : number) : CalculateAction => {
    return {
        type : CALCULATE,
        payload : {
            calcResult
        }
    };
};

export const setHistory = () : SetHistoryAction => {
    return {
        type : SET_HISTORY
    };
};

const initialState : CalcState = {
    currentExpression : '',
    calcHistory : [],
    calculationResult : 0,
    lastExpression : ''
};

const reducer = (state : CalcState = initialState, action : MakeExpressionAction | ResetExpressionAction | CalculateAction | SetHistoryAction) : CalcState => {
    switch (action.type) {
        case MAKE_EXPRESSION :
            return setCurrentExpression(state, action);

        case RESET_EXPRESSION : 
            return resetCurrentExpression(state);

        case CALCULATE :
            return calculateExpression(state, action);

        case SET_HISTORY :
            return setCalcHistory(state);
        
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
        calculationResult : action.payload.calcResult
    };
};

const setCalcHistory = (state : CalcState) : CalcState => {
    const id = makeUniqueId();
    console.log('id : ', id);
    return {
        ...state,
        calcHistory : state.calcHistory.concat({
            id,
            expression : state.lastExpression
        })
    };
};

export default reducer;