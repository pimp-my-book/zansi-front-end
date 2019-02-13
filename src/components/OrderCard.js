import React from "react";
import styled from "styled-components";
import * as Icon from "react-feather";
import {Card,Container, Row,Col, Badge} from "react-bootstrap";
import Heading from "../components/typography/Heading";
import Textbody from "../components/typography/Textbody";
import {timeDifferenceForDate} from '../utils'

const CardStyles = styled(Card)`
  &&& {
    width:450px;
    height: 300px;
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
    onClick,
    
    ...props
}) => {
    return(
       <CardStyles
       {...props}
       >
           <Card.Body className="text-align-center justify-content-center">
             <Container>
                 <Row className="justify-content-end">
                     <Col>
                     <Heading>{orderTitle}</Heading>
         <Textbody>{orderID}</Textbody>
          <Textbody>{timeDifferenceForDate(parseInt(orderDate))}</Textbody>
          
                     </Col>
                     <Col className="ml-5  order-1">
                     <Card.Text>
                     {orderStatus === null &&
                                    
                                    <Badge pill variant="danger">
                               {orderStatus === null ? 'received' : orderStatus}
                                </Badge>
                                    }

                                    {orderStatus === "Delivered to Beneficiary" &&
                                    
                                    <Badge pill variant="success">
                           {orderStatus}
                                </Badge>
                                    }


                                     {orderStatus === "Beneficiary Collected" &&
                                    
                                    <Badge pill variant="success">
                                {orderStatus}
                                </Badge>
                                    }

                    {orderStatus !== "Delivered to Beneficiary" && orderStatus !== null && orderStatus !== "received" &&
                                    
                                    <Badge pill variant="warning">
                          {orderStatus}
                                </Badge>
                                    }
                                    
                                    {orderStatus === "received" &&
                                    <Badge pill variant="danger">
                                { orderStatus}
								</Badge>
								}

                        </Card.Text> 
                         
                     </Col>
                 </Row>
             </Container>
              
           </Card.Body>
           <Card.Footer>
               <Container>
                   <Row >

                   <Col lg={8}>
                   <Textbody className="mr-2">
                   <Icon.Trash2 
                   onClick={onClick}
                   /> 
                  Cancel Order
                       </Textbody>
                   </Col>

                </Row>
                 </Container>
                </Card.Footer>
       </CardStyles>
    )
}

export default OrderCard;