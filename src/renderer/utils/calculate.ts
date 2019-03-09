const divisionExpression = () => {
    
};

const sum = (firstNum : number, lastNum : number) => {

};

const minus = (firstNum : number, lastNum : number) => {

};

const multiplication = (firstNum : number, lastNum : number) => {

};

const division = (firstNum : number, lastNum : number) => {

};

const calculate = (currentExpression : string) => {
    // operator : string, firstNum : number, lastNum : number
    const operator : string = '';
    const firstNum : number = 0;
    const lastNum : number = 0;

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