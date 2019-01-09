import React from "react";
import styled from "styled-components";
import {Card} from "react-bootstrap";
import LinkButton from "./LinkButton";

const CardStyles = styled(Card)`
  &&& {
    width:300px;
    height: 150px;
    border: none;
      box-shadow: 0px 2px 4px rgba(0,0,0,0.18);
      background-color: var(--white);
  }
 `;
  
const LinkStyles = styled(Card.Link)`
 &&& {
     text-decoration: none;
     color: var(--rose-pink);

     :hover {
         color: var(--medium-sky-blue);
     }
 }
`;



const CardStructure = ({
    textBody,
    textLink,
    ...props
}) => {
    return(
       <CardStyles
       {...props}
       >
           <Card.Body className="text-align-center justify-content-center">
           <Card.Text>{textBody}</Card.Text>
               <LinkStyles className="mt-3 " {...props}> {textLink}</LinkStyles>
           </Card.Body>
          
       </CardStyles>
    )
}

export default CardStructure;