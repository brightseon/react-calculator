import React from 'react';

interface IProps {
    className : string;
    onClick : (e : React.MouseEvent<HTMLButtonElement>) => void;
    text : number | string;
};

const Button : React.SFC<IProps> = ({ className, onClick, text }) => (
    <button className={ className } type="button" onClick={ onClick }>{ text }</button>
);

export default Button;