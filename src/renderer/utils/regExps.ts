export const operatorRegExp : RegExp = /[\+\-\*\/\×\÷]/g;
export const firstOperatorRegExp : RegExp = /^[\+\-\*\/\×\÷]/;
export const operatorRegExpAddDot : RegExp = /[\+\-\*\/\×\÷\.]/;
export const notCalcButtonRegExp : RegExp = /[^0-9\+\-\*\/\×\÷\(\)\.]/;
export const expressionRegExp : RegExp = /[0-9][\+\-\*\/\×\÷][0-9]/;
export const zeroDotRegExp : RegExp = /0[\.]/;
export const multipleDivision : RegExp = /[\*\×\/\÷]/;
export const sumMinus : RegExp = /[\+\-]/;