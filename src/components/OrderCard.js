import React from "react";
import styled from "styled-components";
import {Card,Container, Row,Col, Table, Badge} from "react-bootstrap";
import LinkButton from "./LinkButton";
import Heading from "../components/typography/Heading";
import Textbody from "../components/typography/Textbody";
import {timeDifferenceForDate} from '../utils'

const CardStyles = styled(Card)`
  &&& {
    width:400px;
    height: 200px;
    border-radius: 5px;
    border: none;
      box-shadow: 0px 2px 4px rgba(0,0,0,0.18);
      background-color: white;
  }
 `;
  




const OrderCard = ({
    orderTitle,
    orderID,
    orderStatus,
    orderDate,
    
    ...props
}) => {
    return(
       <CardStyles
       {...props}
       >
           <Card.Body className="text-align-center justify-content-center">
             <Container>
                 <Row>
                     <Col>
                     <Card.Title><Heading>{orderTitle}</Heading></Card.Title>
          <Card.Text><Textbody>{orderID}</Textbody></Card.Text>
           <Card.Text><Textbody>{timeDifferenceForDate(parseInt(orderDate))}</Textbody></Card.Text>
           
                     </Col>
                     <Col>
                     <Card.Text><Badge variant="danger">{orderStatus}</Badge></Card.Text>
                     </Col>
                 </Row>
             </Container>
              
           </Card.Body>
       </CardStyles>
    )
}

export default OrderCard;