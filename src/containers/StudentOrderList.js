import React, {Component} from "react";
import * as Icon from "react-feather";
import { Query} from "react-apollo";
import {STUDENT_ORDER_LIST}from "../graphql/Queries";
import { Col, Container, Row, Table, Badge } from "react-bootstrap";
import DisplayMedium from "../components/typography/DisplayMedium";
import DisplayLarge from "../components/typography/DisplayLarge";
import Heading from "../components/typography/Heading";
import Textbody from "../components/typography/Textbody";
import Subheading from "../components/typography/Subheading";
import LoadingSpinner from "../components/LoadingSpinner";
import OrderCard from "../components/OrderCard";

export default class StudentOrderList extends Component{
	constructor(props){
		super(props);

	}

  



	render(){
		return(
			<div>
				<Container>
					<Row>
						<Col>
							<DisplayLarge>Your Orders</DisplayLarge>
						</Col>
					</Row>
				</Container>
				<Container>
					<Row>
						<Col>
							<Query query={STUDENT_ORDER_LIST}>
								{({data}, loading, error) =>{
									if (loading) return <p>Loading...</p>;
									if (error) return <p>Error</p>;

									const myOrders = data.studentOrderList;
                                    console.log(myOrders)
									if(!myOrders){
										return <p>You need to make more orders</p>;
									} else {
										return(
											<div>
												{myOrders.map((orders) => (
													<div 
														key={orders.orderId}>
														<OrderCard
															orderTitle={orders.title}
															orderID={orders.orderId}
															orderStatus={orders.status}
															orderDate={orders.dateOrdered}
														/> 
                                
														<p></p>
														<p></p>
														<p></p>
														<p></p>
													</div>
												))}
											</div>
										);
									}

								}}
							</Query>
						</Col>
					</Row>
				</Container>
			</div>
		);
      
	}
}