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
            	<Row>
            		<Col>
            			<DisplayLarge>
                          Activity Feed
 							</DisplayLarge>
            		</Col>
            	</Row>
            </Container>

            <Container>
            	<Query query={ORDER_LIST}>
            		{({data, loading, error}) => {

            			if (loading) return <LoadingSpinner/>;
            			if (error) return <Info
            				text={`${error}`}
            				variant="danger"/>;
                            const activties = data.orderList;
            			return (
            				<Row className="justify-content-center">
            		     <Col lg={8}>
                     {activties.map(orders => (
                       

                      <>
                       {orders.orderStatus === "Cancel Request" && 
                     
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
            	     </Row>

            			);
            		}}
            	</Query>
            	
            </Container>
              
            </>
		);
	}
}