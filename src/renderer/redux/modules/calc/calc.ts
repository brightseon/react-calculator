import { MAKE_EXPRESSION, CalcState, MakeExpressionAction, RESET_EXPRESSION, ResetExpressionAction, 
    CALCULATE, CalculateAction, SET_HISTORY, SetHistoryAction, CHANGE_CHECK_VALUE, ChangeCheckValue, 
    REMOVE_HISTORY, RemoveHistoryAction, ALL_REMOVE_HISTORY, AllRemoveHisotryAction
} from './types';

export const makeExpression = (expression : string) : MakeExpressionAction => {
    return {
        type : MAKE_EXPRESSION,
        payload : {
            expression
        }
    };
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

export const setHistory = (id : string) : SetHistoryAction => {
    return {
        type : SET_HISTORY,
        payload : {
            id
        }
    };
};

export const changeCheckValue = (id : string) : ChangeCheckValue => {
    return {
        type : CHANGE_CHECK_VALUE,
        payload : {
            id
        }
    };
};

export const removeHistory = () : RemoveHistoryAction => {
    return {
        type : REMOVE_HISTORY
    };
};

export const resetHistory = () : AllRemoveHisotryAction => {
    return {
        type : ALL_REMOVE_HISTORY
    };
};

const initialState : CalcState = {
    currentExpression : '',
    calcHistory : JSON.parse(localStorage.getItem('history')) || [],
    calculationResult : 0,
    lastExpression : ''
};

const reducer = (state : CalcState = initialState, action : MakeExpressionAction | ResetExpressionAction | CalculateAction | SetHistoryAction | ChangeCheckValue | RemoveHistoryAction | AllRemoveHisotryAction) : CalcState => {
    switch (action.type) {
        case MAKE_EXPRESSION :
            return setCurrentExpression(state, action);

        case RESET_EXPRESSION : 
            return resetCurrentExpression(state);

        case CALCULATE :
            return calculateExpression(state, action);

        case SET_HISTORY :
            return setCalcHistory(state, action);

        case CHANGE_CHECK_VALUE :
            return setIsChecked(state, action);

        case REMOVE_HISTORY :
            return removeChooseHistory(state);

        case ALL_REMOVE_HISTORY :
            return resetCalcHistory(state);
        
        default :
            return state;
    }
};

const setCurrentExpression = (state : CalcState, action : MakeExpressionAction) : CalcState => {
    return {
        ...state,
        currentExpression : action.payload.expression
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

const setCalcHistory = (state : CalcState, action : SetHistoryAction) : CalcState => {
    return {
        ...state,
        calcHistory : state.calcHistory.concat({
            id : action.payload.id,
            expression : `${ state.lastExpression } = ${ state.calculationResult }`,
            isChecked : false
        })
    };
};

const setIsChecked = (state : CalcState, action : ChangeCheckValue) : CalcState => {
    return {
        ...state,
        calcHistory : state.calcHistory.map(history => 
            history.id === action.payload.id ? { ...history, isChecked : !history.isChecked } : history
        )
    };
};

const removeChooseHistory = (state : CalcState) : CalcState => {
    return {
        ...state,
        calcHistory : state.calcHistory.filter(history => history.isChecked !== true)
    };
};

const resetCalcHistory = (state : CalcState) : CalcState => {
    return {
        ...state,
        calcHistory : []
    };
};

export default reducer;