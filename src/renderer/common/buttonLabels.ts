interface labelInfo {
    className : string;
    text : string;
}

const CLEAR_BTN = 'clearBtn';
const OPERATOR_BTN = 'operatorBtn';
const NUMBER_BTN = 'numberBtn';
const EQUAL_BTN = 'equalBtn';


// className, text, 
export const buttonLabels : Array<labelInfo> = [
    { className : CLEAR_BTN, text : 'C' },
    { className : OPERATOR_BTN, text : '(' },
    { className : OPERATOR_BTN, text : ')' },
    { className : OPERATOR_BTN, text : '÷' },
    { className : NUMBER_BTN, text : '7' },
    { className : NUMBER_BTN, text : '8' },
    { className : NUMBER_BTN, text : '9' },
    { className : OPERATOR_BTN, text : '×' },
    { className : NUMBER_BTN, text : '4' },
    { className : NUMBER_BTN, text : '5' },
    { className : NUMBER_BTN, text : '6' },
    { className : OPERATOR_BTN, text : '+' },
    { className : NUMBER_BTN, text : '1' },
    { className : NUMBER_BTN, text : '2' },
    { className : NUMBER_BTN, text : '3' },
    { className : OPERATOR_BTN, text : '-' },
    { className : NUMBER_BTN, text : '±' },
    { className : NUMBER_BTN, text : '0' },
    { className : NUMBER_BTN, text : '.' },
    { className : EQUAL_BTN, text : '=' },
];