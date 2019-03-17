import { operatorRegExp, numRegExp } from './regExps';

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

// (를 쓸 수 있는지 확인한다.
const isWritingLeftParenthesis = (currentExpression : string) : boolean => {
    const lastChar = getLastChar(currentExpression);
    // 식이 비어있는지 확인(비어있으면 true, 아니면 false)
    const isLastCharEmptyStr = currentExpression === '';
    // 계산식의 마지막 문자가 +, -, *, /인지 확인(+, -, *, /이라면 true, 아니면 false)
    const isOperator = operatorRegExp.test(lastChar);
    // 계산식에 (가 있는지 확인(있으면 true, 없으면 false)
    const isLeftParenthesis = currentExpression.indexOf('(') !== -1;
    // 계산식에 )가 있는지 확인(없으면 true, 있으면 false)
    const isRightParenthesis = currentExpression.indexOf(')') === -1;
    // 마지막 문자가 )인지 확인(마지막 문자가 ')'라면 true, 아니면 false)
    const isLastCharRightParenthesis = lastChar === ')';

    if(!isLastCharEmptyStr && !isOperator || (isLeftParenthesis && isRightParenthesis) || isLastCharRightParenthesis) {
        return false;
    }

    return true;
};

// )를 쓸 수 있는지 확인한다.
const isWritingRightParenthesis = (currentExpression : string) : boolean => {
    const lastChar = getLastChar(currentExpression);
    // 식이 비어있는지 확인(비어있다면 true, 아니면 false)
    const isEmptyExpression = currentExpression === '';
    // (가 있는지 확인(있다면 true, 없으면 false)
    const isLeftParenthesis = currentExpression.indexOf('(') !== -1;
    // 마지막 문자가 숫자인지 확인(숫자면 true, +, -, *, /, ., (, ) 이면 false)
    const isLastCharNum = numRegExp.test(lastChar);

    if(isEmptyExpression || !isLeftParenthesis || (isLeftParenthesis && !isLastCharNum)) {
        return false;
    }

    return true;
};

export {
    isDotWriting,
    getLastChar,
    isWritingLeftParenthesis,
    isWritingRightParenthesis
};