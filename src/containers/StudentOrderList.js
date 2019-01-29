import React, {Component, Fragment} from "react";
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
import styled from "styled-components";

export default class StudentOrderList extends Component{
	constructor(props){
		super(props);

	}

  



	render(){

        const OrdersGrid = styled.div`
        display: grid;
        grid-gap: 20px;
        grid-template-columns: repeat(2, 3fr);
        `;

       

		return(
			<Fragment>
				<Container>
					<Row>
						<Col>
							<DisplayLarge>Your Orders</DisplayLarge>
						</Col>
					</Row>
				</Container>
				<Container>
					<Row>
						<Col sm={8} >
							<Query query={STUDENT_ORDER_LIST}>
								{({data,loading, error} ) =>{
									if (loading) return <p>Loading...</p>;
									if (error) return <p>Error</p>;

									const myOrders = data.studentOrderList;
									if (!myOrders.length){
										return(
											<p>Wrong</p>
										);

									} else {
										return(
										
											<Fragment>
											<OrdersGrid>
										   {myOrders.map((orders) => (
											   
												  
												   
												   <Fragment key={orders.orderId}>
												 <OrderCard
													   orderTitle={orders.title}
													   orderID={orders.orderId}
													   orderStatus={orders.status}
													   orderDate={orders.dateOrdered}
													   /> 
												   </Fragment>
												  
												  
													   
												   
											   
										   ))}
										   </OrdersGrid>
									   
									   </Fragment>
										)
									}
										
									

								}}
							</Query>
						</Col>
					</Row>
				</Container>
                </Fragment>
		);
      
	}
}