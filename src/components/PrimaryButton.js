import React from "react";
import styled, {keyframes} from "styled-components";
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
 color: var(--rose-pink);
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

const rotate = keyframes`
  from {
	  transform: rotate(0deg);
  }

  to {
	  transform: rotate(360deg);
  }
`;

const Spinner = styled.span`
 display: inline-block;
 animation: ${rotate} 4s  infinite linear;
`;


const PrimaryButton = ({
	onClick,
	isLoading,
	text,
	loadingText,
	disabled=false,
	...props 
}) =>{

	return (
		<PrimaryButtonStyles
			{...props}
			disabled={disabled || isLoading}
		>
		     {isLoading && <Spinner><Icon.RotateCcw/></Spinner>}
			{!isLoading ? text: loadingText}
		</PrimaryButtonStyles>
	);

};

export default PrimaryButton;