import { operatorRegExp, firstOperatorRegExp, operatorRegExpAddDot } from './regExps';

interface Expression {
    operator : string;
    firstNum : number;
    lastNum : number;
};

// 처음에 오는 문자가 +, -, *, /인지 확인하는 함수
const isFirstOperator = (currentExpression : string) : boolean => {
    return firstOperatorRegExp.test(currentExpression);
};

// 마지막에 오는 문자가 +, -, *, /, .인지 확인하는 함수
const isLastCharOperator = (currentExpression : string) : boolean => {
    const lastChar = currentExpression.charAt(currentExpression.length - 1);

    return operatorRegExpAddDot.test(lastChar);
};

// 문자열로 되어 있는 계산식을 연산자를 중심으로 나누는 함수
const divisionExpression = (currentExpression : string) : Expression => {
    const operatorArr = currentExpression.match(operatorRegExp);

    if(operatorArr && operatorArr[0]) {
        const operator = operatorArr[0];
        const splitExpression = currentExpression.split(operator);
        const firstNum = parseFloat(splitExpression[0]);
        const lastNum = parseFloat(splitExpression[1]);
    
        return {
            operator,
            firstNum,
            lastNum
        };
    }
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

const calculate = (currentExpression : string) : number => {
    if(currentExpression) {
        const { operator, firstNum, lastNum } = divisionExpression(currentExpression);
    
        if(operator && firstNum && lastNum) {
            switch(operator) {
                case '+' : 
                    return sum(firstNum, lastNum);
                
                case '-' :
                    return minus(firstNum, lastNum);
        
                case '*' :
                    return multiplication(firstNum, lastNum);
        
                case '/' :
                    return division(firstNum, lastNum);
        
                default :
                    console.error('유효하지 않은 식');
        
                    break;
            }
        }
    }

    return 0;
};

export {
    isFirstOperator,
    calculate,
    isLastCharOperator
};