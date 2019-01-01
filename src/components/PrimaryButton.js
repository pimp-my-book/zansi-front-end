import React from 'react';
import styled from "styled-components";
import { Button } from "react-bootstrap";


const PrimaryButtonStyles = styled(Button)`
&&&{

color: var(--linen);
background-color: var(--rose-pink);
border: none;

:hover {
 background-color: var(--linen);
 color: var(--rasin-black);
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