import React from "react";
import {Link} from "react-router-dom";
import { Button} from "react-bootstrap";
import styled from "styled-components";




const OutlineButtonStyles = styled(Button)`
&&&{
color: var(--rasin-black);
background-color: transparent;
border: 2px solid var(--rose-pink) ;
width: ${props => props.small ? '100px' : '180px'};
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
a{
    color: var(--rasin-black);
}
a:hover {
    text-decoration: none;
}
`;



const OutlineButton = ({
	onClick,
	
	text,
	to,
	
	...props 
}) =>{

	return (
		<OutlineButtonStyles
		onClick={onClick}
			{...props}
		>
        <Link to={to}>
        {text}
        </Link>
		     
		</OutlineButtonStyles>
	);

};

export default OutlineButton;
