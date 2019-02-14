import React, {Component, Fragment} from "react";
import {Auth} from "aws-amplify";
import { Query} from "react-apollo";
import {STUDENT_ORDER_LIST}from "../graphql/Queries";

import { Col, Container, Row,Image, Form } from "react-bootstrap";
import DisplayLarge from "../components/typography/DisplayLarge";
import LoadingSpinner from "../components/LoadingSpinner";
import OrderCard from "../components/OrderCard";
import styled from "styled-components";
import Info from "../components/Info";
import LinkButton from "../components/LinkButton";
import Textbody from "../components/typography/Textbody";
import ModalDialog from "../components/ModalDialog";
import PrimaryButton from "../components/PrimaryButton";

export default class StudentOrderList extends Component{
	
	constructor(props) {
		super(props);

		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleChange = this.handleChange.bind(this);

	
		this.state = {
		  userId: "",
		  show: false,
		  orderStatus: ""
		};
	  }


	  handleClose(){
		this.setState({show: false});
	}

	handleShow(){
		this.setState({show: true});
	}

	  handleChange = name => event =>{
        this.setState({
            [name]: event.target.value
        });
    } 



	  async componentDidMount(){
		try {
			 const userData = await Auth.currentSession()
			  this.setState({userId: userData.UserAttributes.Username});

			}catch (e){
			if (e !== 'No Current User!') {
				console.log(e);
			}
		}

		
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

				



	{/* THE CONTAINER THAT RENDERS THE ORDERS*/}
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
							<Query 
							variables={{userId: this.state.userId}}
							query={STUDENT_ORDER_LIST}>
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
									console.log(myOrders);
									
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
													   orderStatus={orders.orderStatus}
													   orderDate={orders.dateOrdered}
													   onClick={this.handleShow}
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
				{/* THE  END CONTAINER THAT RENDERS THE ORDERS*/}
                </Fragment>
		);
      
	}
}