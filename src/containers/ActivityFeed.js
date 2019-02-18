import React, {Component} from "react"; 
import { Query} from "react-apollo";
import { Col, Container, Row } from "react-bootstrap";
import {ORDER_LIST}from "../graphql/Queries";
import DisplayLarge from "../components/typography/DisplayLarge";
import LoadingSpinner from "../components/LoadingSpinner";
import ActivityCard from "../components/ActivityCard";
import Info from "../components/Info";

export default class ActivityFeed extends Component {
	

	render(){
		return(
            
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

           
            	
           
          
		);
	}
}