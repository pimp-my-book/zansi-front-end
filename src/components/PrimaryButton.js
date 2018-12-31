import React from 'react';
import styled from "styled-components";
import { Button } from "react-bootstrap";


const PrimaryButtonStyles = styled(Button)`
&&&{
padding: 10px;
color: pink;
background-color: red;
border: none;

:hover {
 background-color: pink;
}
}
`;



const PrimaryButton = ({
    onClick,
    text,
    disabled 
}) =>{

    return (
        <PrimaryButtonStyles
        onClick={onClick}
        disabled={disabled}
        >
        {text}
        </PrimaryButtonStyles>
    )

}

export default PrimaryButton;