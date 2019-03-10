export interface LabelInfo {
    labelType : string;
    text : string;
};

export const CLEAR_BTN = 'clearBtn';
export const OPERATOR_BTN = 'operatorBtn';
export const NUMBER_BTN = 'numberBtn';
export const EQUAL_BTN = 'equalBtn';

// className, text, 
export const buttonLabels : Array<LabelInfo> = [
    { labelType : CLEAR_BTN, text : 'C' },
    { labelType : OPERATOR_BTN, text : '(' },
    { labelType : OPERATOR_BTN, text : ')' },
    { labelType : OPERATOR_BTN, text : '÷' },
    { labelType : NUMBER_BTN, text : '7' },
    { labelType : NUMBER_BTN, text : '8' },
    { labelType : NUMBER_BTN, text : '9' },
    { labelType : OPERATOR_BTN, text : '×' },
    { labelType : NUMBER_BTN, text : '4' },
    { labelType : NUMBER_BTN, text : '5' },
    { labelType : NUMBER_BTN, text : '6' },
    { labelType : OPERATOR_BTN, text : '+' },
    { labelType : NUMBER_BTN, text : '1' },
    { labelType : NUMBER_BTN, text : '2' },
    { labelType : NUMBER_BTN, text : '3' },
    { labelType : OPERATOR_BTN, text : '-' },
    { labelType : NUMBER_BTN, text : '±' },
    { labelType : NUMBER_BTN, text : '0' },
    { labelType : NUMBER_BTN, text : '.' },
    { labelType : EQUAL_BTN, text : '=' }
];