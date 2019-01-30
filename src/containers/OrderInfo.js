import React, {Component} from "react"; 
import { Query, Mutation} from "react-apollo";
import { Col, Container, Row,  Badge, Form } from "react-bootstrap";
import {VIEW_ORDER}from "../graphql/Queries";
import { UPDATE_ORDER_STATUS}from "../graphql/Mutations";
import * as Icon from "react-feather";
import DisplayLarge from "../components/typography/DisplayLarge";
import DisplayMedium from "../components/typography/DisplayMedium";
import Heading from "../components/typography/Heading";
import Textbody from "../components/typography/Textbody";
import Subheading from "../components/typography/Subheading";
import LoadingSpinner from "../components/LoadingSpinner";
import LinkButton from "../components/LinkButton";
import Info from "../components/Info";
import PrimaryButton from "../components/PrimaryButton";
import ModalDialog from "../components/ModalDialog";
import {timeDifferenceForDate} from "../utils";
import {Statuses} from "../constants";


export default class OrderInfo extends Component {
	constructor(props){
		super(props);

		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleChange = this.handleChange.bind(this);

		this.state = {
			show: false,
            
			
			orderStatus: "",
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


	render(){
		const {orderId, userId} = this.props.match.params;
       const {orderStatus} = this.state;

		return(
			<div>
				<Container>
					<Row>
						<Col>
							<DisplayLarge>
                        Order Info
							</DisplayLarge>
						</Col>
					</Row>
				</Container>
                
				<Query 
					query={VIEW_ORDER}
					variables={{
						orderId: orderId,
						userId: userId}}
				>
					{({error, loading, data}) => {
						if (loading) return <p>loading</p>;
						if (error) return <p>error</p>;
						const orderInfo = data.viewOrder;
						return(
							<Container>
								<Row>
									<Col>
                                        <Heading>Status: 

                                         {orderInfo.orderStatus === null &&
                                    
                                    <Badge pill variant="danger">
                                {orderInfo.orderStatus === null ? 'received' : orderInfo.orderStatus}
                                </Badge>
                                    }

                                 {orderInfo.orderStatus === "Delivered to Beneficiary" &&
                                    
                                    <Badge pill variant="success">
                                {orderInfo.orderStatus}
                                </Badge>
                                    }

                                    {orderInfo.orderStatus !== "Delivered to Beneficiary" && orderInfo.orderStatus !== null && orderInfo.orderStatus !== "received" &&
                                    
                                    <Badge pill variant="warning">
                                {orderInfo.orderStatus}
                                </Badge>
									}
									
                                    {orderInfo.orderStatus === "received" &&
                                    <Badge pill variant="danger">
                                { orderInfo.orderStatus}
								</Badge>
								}

										</Heading>
                                        <Icon.Package onClick={this.handleShow}/> Update Order Status
									</Col>
								</Row>
								<Row>
									<Col>
										<DisplayMedium><Icon.Info/> {orderInfo.orderId}</DisplayMedium>
                             
										<Heading><Icon.Book/>{orderInfo.title}</Heading>
										<Heading>ISBN: {orderInfo.ISBN}</Heading>
										<Heading>Author: {orderInfo.author}</Heading>
										<Heading>Edition: {orderInfo.edition}</Heading>
                                
										<Heading><Icon.Clock/> ordered {timeDifferenceForDate(parseInt(orderInfo.dateOrdered))}</Heading>
                               
									</Col>

									<Col>
										<DisplayMedium><Icon.User/> {orderInfo.name}</DisplayMedium>
										<Heading> <Icon.Hash/>{orderInfo.studentNumber}</Heading>
										<Heading><Icon.Mail/> {orderInfo.email}</Heading>
										<Heading> University: {orderInfo.univeristy}</Heading>
										<Heading> Degree: {orderInfo.degree}</Heading>
										<Heading> Bursary: {orderInfo.bursary}</Heading>
										<Heading> <Icon.Phone/> {orderInfo.cellNumber}</Heading>
										<Heading> <Icon.Home/> {orderInfo.address}</Heading>
                               
                               
                               
									</Col>
								</Row>

                           
							</Container>
                        
                        
						);
					}}
				</Query>

				<Container>
					<Row>
						<Col>
							<LinkButton sm href="/dashboard" >Back to dashboard</LinkButton>
						</Col>
					</Row>
				</Container>

                <Query 
					query={VIEW_ORDER}
					variables={{
						orderId: orderId,
						userId: userId}}
				>
					{({error, loading, data}) => {
						if (loading) return <p>loading</p>;
						if (error) return <p>error</p>;
                        const orderInfo = data.viewOrder;
                        console.log(orderInfo.email)
                        return (
                            <Mutation
					mutation={UPDATE_ORDER_STATUS}
					variables={{
                        orderId: orderId,
						userId: userId,
                        email: orderInfo.email,
						orderStatus

                    }}>
					{(statusUpdate , {error, loading, called}) => {
						if(called){
							return  (
								<p>The stauts of the order has been changed</p>
							);
						} else {
							return(
								
								<ModalDialog
									show={this.state.show}
									onHide={this.handleClose}
									title="Update Order Status"
                                    text="Heloo"
                                    buttonText="Update Status"
                                    
                                >
								<Form onSubmit={
									async e => {
									 e.preventDefault();
									 console.log(orderStatus);
									 await statusUpdate();
									}
								 }>
									
										<Form.Group controlId="staus">
											<Form.Label>
												<Textbody>
                                              Choose a status
												</Textbody>
											</Form.Label>
											<Form.Control
												as="select"
                                                required
                                                value={orderStatus}
                                            onChange={this.handleChange('orderStatus')}
											>
												{Statuses.map(
													statusOp => (
														
														<option
															key={statusOp}
														>
															{statusOp}
														</option>
														
													)
												)}
											</Form.Control>
                                            
										</Form.Group>
										<PrimaryButton
											text="Update Status"
											type="submit"
											/>
									</Form>
								</ModalDialog>
								
							);
						}
					}}
				</Mutation>

                        )
				
                    }}
                      </Query>
				
			</div>
		);
	}
}