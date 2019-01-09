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
      background-color: var(--bubblegum);
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
           <Card.Body>
           <Card.Text>{textBody}</Card.Text>
               <Card.Link className="mt-3"{...props}> {textLink}</Card.Link>
           </Card.Body>
          
       </CardStyles>
    )
}

export default CardStructure;