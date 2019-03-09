interface Expression {
    operator : string;
    firstNum : number;
    lastNum : number;
};

const divisionExpression = (currentExpression : string) : Expression => {
    const regExp = /[\+\-\÷\×]/;
    const operatorArr = currentExpression.match(regExp);
    const operator = operatorArr[0];
    const splitExpression = currentExpression.split(operator);
    const firstNum = parseInt(splitExpression[0]);
    const lastNum = parseInt(splitExpression[1]);

    return {
        operator,
        firstNum,
        lastNum
    };
};

const sum = (firstNum : number, lastNum : number) : number => {
    console.log('calculate.ts sum start');

    return firstNum + lastNum;
};

const minus = (firstNum : number, lastNum : number) : number => {
    console.log('calculate.ts minus start');

    return firstNum - lastNum;
};

const multiplication = (firstNum : number, lastNum : number) : number => {
    console.log('calculate.ts multiplication start');

    return firstNum * lastNum;
};

const division = (firstNum : number, lastNum : number) : number => {
    console.log('calculate.ts division start');

    return firstNum / lastNum;
};

const calculate = (currentExpression : string) => {
    const { operator, firstNum, lastNum } = divisionExpression(currentExpression);

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
};

export default calculate;