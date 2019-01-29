import React, {Component, Fragment} from "react";
import { Query} from "react-apollo";
import {STUDENT_ORDER_LIST}from "../graphql/Queries";
import { Col, Container, Row, Table, Badge,Image } from "react-bootstrap";
import DisplayLarge from "../components/typography/DisplayLarge";
import LoadingSpinner from "../components/LoadingSpinner";
import OrderCard from "../components/OrderCard";
import styled from "styled-components";
import Info from "../components/Info";
import LinkButton from "../components/LinkButton";
import Textbody from "../components/typography/Textbody";

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

		const Email = "https://s3.amazonaws.com/zansi-static-assest/Illustrations/undraw_empty_xct9.svg";


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
									if (loading) return (
									<Container>
										<Row>
											<Col>
                                           <LoadingSpinner/>
											</Col>
										</Row>
									</Container>);

										if (error) return <Fragment><Info text={error.message.replace('GraphQL error:', '')}
										  variant="danger"/>
										</Fragment>;
								

									const myOrders = data.studentOrderList;
									if (!myOrders.length){
										return(
											<Fragment>
												<Container>
										<Row>
											<Col>
											<Image
					                         src={Email}
					                         width={200}
					                           fluid
					                        className=" d-none d-lg-block"
				                               />
                                <Textbody>You have not placed any orders yet. Click below to place your first order.</Textbody>
                               <LinkButton className="ml-3"sm href="/order" >
							   Place an Order
							   </LinkButton>
											</Col>
										</Row>
									</Container>
											</Fragment>
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