import React from "react";
import styled, {keyframes} from "styled-components";
import { Button } from "react-bootstrap";
import * as Icon from "react-feather";


const PrimaryButtonStyles = styled(Button)`
&&&{

color: var(--rasin-black);
background-color: var(--rose-pink);
border: 2px solid var(--rose-pink) ;
width: ${props => props.sm ? '100px' : '150px'};
font-size: 20px;
padding: 2px;

:hover {
 background-color: var(--rose-pink);
 color: var(--linen);
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
	href,
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