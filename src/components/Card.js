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
      background-color: white;
  }
 `;
  
const LinkStyles = styled(Card.Link)`
 &&& {
     text-decoration: none;
     color: #ff6bd6;

     :hover {
         color: #64E9EE;
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