import React from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import * as Icon from "react-feather";


const PrimaryButtonStyles = styled(Button)`
&&&{

color: var(--linen);
background-color: var(--rose-pink);
border: none;
width: 156px;
font-size: 20px;

:hover {
 background-color: var(--linen);
 color: var(--rasin-black);
   }
   border: 1px solid var(--rose-pink);
}

.btn:focus, .btn:active:focus, .btn.active:focus {
    border: 1px solid var(--linen);
    border-color: var(--linen);
}

.btn:active {
    background-color: var(--linen);
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
	);

};

export default PrimaryButton;