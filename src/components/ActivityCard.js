import React from "react";
import styled from "styled-components";
import * as Icon from "react-feather";
import {Link} from "react-router-dom";
import {Card,Container, Row,Col} from "react-bootstrap";
import Textbody from "../components/typography/Textbody";
import {timeDifferenceForDate} from "../utils";


const CardStyles = styled(Card)`
  &&& {
    width:500px;
    height: 100px;
    border-radius: 5px;
    border: none;
    box-shadow: 0px 2px 4px rgba(0,0,0,0.18);
    background-color: white;
    margin-bottom: 20px;
  }
 `;


 const ActivityCard = ({
     orderOwner,
     orderID,
     userID,
     statusDate,
     //onClick,
     ...props
 }) => {
     return(
         <CardStyles
         {...props}
         > 
         <Card.Body>
             <Container>
                 <Row>
                     <Col lg={1}>
                     <Icon.AlertOctagon />
                     </Col>
                     <Col lg={8}>
                    <Card.Text>
                       <Textbody>{orderOwner} has just request to cancel their order about {timeDifferenceForDate(parseInt(statusDate))}.</Textbody> 
                
                    </Card.Text>
                     </Col>
                     <Col>
                     <Link
                   to={`/orderinfo/${orderID}/${userID}`}
                   >
                  <Icon.Eye/>
                  </Link>
                     </Col>
                 </Row>
             </Container>
         </Card.Body>
 
         </CardStyles>
     )
 }

 export default ActivityCard;