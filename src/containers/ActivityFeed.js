import React, {Component, Fragment} from "react"; 
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
				<Row className="justify-content-center">            		
					<Col lg={5}>
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
                            
                       
							const activties =  data.orderList.sort((l2,l1) => l2.statusDate - l1.statusDate);
							if(!activties.length){
                                return (
                                    <Container>
                                    <Row>
                                        <Col>
                                        <Info
									text="No cancellations have been requested yet."
									variant="info"/>
                                        </Col>
                                    </Row>
                                </Container>
                                );
							} else {
								return (
            				
									<Col  lg={8}>
										{activties.map(orders => (
                                  
           
											<Fragment
												key={orders.orderId}
											>
												{orders.orderStatus === "Cancel Request" &&  
                                
                               <ActivityCard
                               
                               	orderOwner={orders.name}
                               	orderID={orders.orderId}
                               	userID={orders.userId}
                               	statusDate={orders.updateDate}
                               />
                               
												}
           
           
												{ orders.orderStatus === "Cancel Requested" &&
                                
                                <ActivityCard
                                	orderOwner={orders.name}
                                	orderID={orders.orderId}
                                	userID={orders.userId}
                                	statusDate={orders.updateDate}
                                />
                                
												}
											</Fragment>
           
           
										))}
									</Col>
                               
           
								);

							}
                        
                        
                           
            		}}
            	</Query>
				</Row>
			</Container>

           
            	
           
          
		);
	}
}