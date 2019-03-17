import { operatorRegExp } from './regExps';

const getLastStrNum = (expression : string) : string => {
    const operatorArr : string[] = expression.match(operatorRegExp);
    const lastOperator : string = operatorArr[operatorArr.length - 1];
    const lastIndex : number = expression.lastIndexOf(lastOperator);
    const substringExpression : string = expression.substring(lastIndex + 1);

    return substringExpression;
};

const isDotWriting = (currentExpression : string) : boolean => {
    let result : boolean = true;

    if(operatorRegExp.test(currentExpression)) {
        const lastStrNum = getLastStrNum(currentExpression);
        
        if(lastStrNum.indexOf('.') !== -1) {
            result = false;
        }
    } else if(!operatorRegExp.test(currentExpression) && currentExpression.indexOf('.') !== -1) {
        result = false;
    }

    return result;
};

const getLastChar = (str : string) : string => {
    const lastChar = str.charAt(str.length - 1);
    
    return lastChar;
};

export {
    isDotWriting,
    getLastChar
};