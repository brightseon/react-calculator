import { operatorRegExp, operatorRegExpGlobal, firstOperatorRegExp, operatorRegExpAddDot, multipleDivision, parenthesisExpressionRegExp, parenthesisRegExp } from './regExps';
import { getLastChar } from './commons';

interface Expression {
    firstNum : number;
    lastNum : number;
};

interface SwitchOperatorReturnType {
    calcResult : number;
    currentExpression : string;
}

// 처음에 오는 문자가 +, -, *, /인지 확인하는 함수
const isFirstOperator = (currentExpression : string) : boolean => {
    return firstOperatorRegExp.test(currentExpression);
};

// 마지막에 오는 문자가 +, -, *, /, .인지 확인하는 함수
const isLastCharOperator = (currentExpression : string) : boolean => {
    const lastChar : string = getLastChar(currentExpression);

    return operatorRegExpAddDot.test(lastChar);
};

// 문자열로 되어 있는 계산식을 연산자를 중심으로 나누는 함수
const divisionExpression = (currentExpression : string, operator : string) : Expression => {
    const splitExpression : string[] = currentExpression.split(operator);
    const firstExpression : string = splitExpression[0];
    const lastExpression : string = splitExpression[1];
    let firstNum : number = 0;
    let lastNum : number = 0;

    if(operatorRegExp.test(firstExpression)) {
        const operatorArr : string[] = makeOperatorArr(firstExpression);
        const lastIndex : number = firstExpression.lastIndexOf(operatorArr[operatorArr.length - 1]);

        firstNum = parseFloat(firstExpression.substring(lastIndex));
    } else {
        firstNum = parseFloat(firstExpression);
    }
    
    if(operatorRegExp.test(lastExpression)) {
        const operatorArr : string[] = makeOperatorArr(lastExpression);
        const firstIndex : number = lastExpression.indexOf(operatorArr[0]);

        lastNum = parseFloat(lastExpression.substring(0, firstIndex));
    } else {
        lastNum = parseFloat(lastExpression);
    }
    
    return {
        firstNum,
        lastNum
    };
};

// 연산자 배열 만드는 함수
const makeOperatorArr = (currentExpression : string) : string[] => {
    const operatorArr = currentExpression.match(operatorRegExpGlobal);

    return resortOperatorArr(operatorArr);
};

// 연산자 배열을 재정렬 하는 함수(*나 /가 우선 순위로)
const resortOperatorArr = (operatorArr : string[]) : string[] => {
    let resortOperator : string[] = [];

    operatorArr.map((currentOperator : string) => {
        multipleDivision.test(currentOperator) ? resortOperator.unshift(currentOperator) : resortOperator.push(currentOperator)
    });

    return resortOperator;
};

const switchOperator = (expression : string, operator : string, firstNum : number, lastNum : number, changeValue? : string) : SwitchOperatorReturnType => {
    let currentExpression : string = expression;
    let calcResult : number = 0;
    const searchValue : string = changeValue ? changeValue : `${ firstNum }${ operator }${ lastNum }`;

    switch(operator) {
        case '+' : 
            calcResult = sum(firstNum, lastNum);
            currentExpression = replaceCurrentExpression(currentExpression, searchValue, calcResult.toString());
            break;
            
        case '-' :
            calcResult = minus(firstNum, lastNum);
            currentExpression = replaceCurrentExpression(currentExpression, searchValue, calcResult.toString());
            break;
            
        case '*' :
        case '×' :
            calcResult = multiplication(firstNum, lastNum);
            currentExpression = replaceCurrentExpression(currentExpression, searchValue, calcResult.toString());
            break;
            
        case '/' :
        case '÷' :
            calcResult = division(firstNum, lastNum);
            currentExpression = replaceCurrentExpression(currentExpression, searchValue, calcResult.toString());
            break;

        default :
            console.error('유효하지 않은 식');

            break;
    }

    return {
        calcResult,
        currentExpression
    };
};

const replaceCurrentExpression = (currentExpression : string, searchValue : string, replaceValue : string) : string => {
    return currentExpression.replace(searchValue, replaceValue);
};

const sum = (firstNum : number, lastNum : number) : number => {
    return firstNum + lastNum;
};

const minus = (firstNum : number, lastNum : number) : number => {
    return firstNum - lastNum;
};

const multiplication = (firstNum : number, lastNum : number) : number => {
    return firstNum * lastNum;
};

const division = (firstNum : number, lastNum : number) : number => {
    return firstNum / lastNum;
};

const calculate = (expression : string) : number => {
    if(!expression || operatorRegExp.test(getLastChar(expression))) return;

    let currentExpression : string = expression;
    let calcResult : number = 0;

    const parenthesisExpressionArr = currentExpression.match(parenthesisExpressionRegExp);

    if(parenthesisExpressionArr && parenthesisExpressionArr.length > 0) {
        parenthesisExpressionArr.map((expression : string) => {
            const operator = expression.match(operatorRegExp)[0];
            const newExpression = expression.replace(parenthesisRegExp, '');
            const { firstNum, lastNum } = divisionExpression(newExpression, operator);
            
            const { currentExpression : returnExpression, calcResult : value } = switchOperator(currentExpression, operator, firstNum, lastNum, expression);

            currentExpression = returnExpression;
            calcResult = value;
        });
    }

    makeOperatorArr(currentExpression).map((currentOperator : string) => {
        const { firstNum, lastNum } = divisionExpression(currentExpression, currentOperator);

        if((firstNum === 0 || lastNum === 0) || (firstNum && lastNum)) {
            const { currentExpression : returnExpression, calcResult : value } = switchOperator(currentExpression, currentOperator, firstNum, lastNum);

            currentExpression = returnExpression;
            calcResult = value;
        }
    });

    return calcResult;
};

export {
    isFirstOperator,
    calculate,
    isLastCharOperator
};