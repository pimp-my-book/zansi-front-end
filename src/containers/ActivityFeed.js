import React, {Component} from "react"; 
import { Query} from "react-apollo";
import styled from "styled-components";
import { Col, Container, Row,  Badge, Form, Collapse, ListGroup } from "react-bootstrap";
import {ORDER_LIST}from "../graphql/Queries";
import * as Icon from "react-feather";
import DisplayLarge from "../components/typography/DisplayLarge";
import DisplayMedium from "../components/typography/DisplayMedium";
import Heading from "../components/typography/Heading";
import Textbody from "../components/typography/Textbody";
import LoadingSpinner from "../components/LoadingSpinner";
import ActivityCard from "../components/ActivityCard";
import {timeDifferenceForDate} from "../utils";
import Info from "../components/Info";

export default class ActivityFeed extends Component {
	constructor(props){
		super(props);
	}

	render(){
		return(
            <>
            <Container>
            <Row className="justify-content-center">            		<Col lg={5}>
            			<DisplayLarge >
                          Activity Feed
 							</DisplayLarge>
            		</Col>
            	
                
            	<Query query={ORDER_LIST}>
            		{({data, loading, error}) => {

            			if (loading) return <Container>
                            <Row className="justify-content-center">
                                <Col >
                                <LoadingSpinner/>
                                </Col>
                            </Row>
                        </Container>;
            			if (error) return <Info
            				text={`${error}`}
            				variant="danger"/>;
                            const activties = data.orderList;
            			return (
            				
            		     <Col  lg={8}>
                     {activties.map(orders => (
                       

                      <>
                       {orders.orderStatus === "Cancel Request" &&  orders.orderStatus === "Cancel Requested" &&
                     
                    <ActivityCard
                    orderOwner={orders.name}
                   orderID={orders.orderId}
                     userID={orders.userId}
                  statusDate={orders.updateDate}
                  />
                    
                }

                      </>


                     ))}
            		      </Col>
            	    

            			);
            		}}
            	</Query>
                </Row>
            </Container>

           
            	
           
              
            </>
		);
	}
}