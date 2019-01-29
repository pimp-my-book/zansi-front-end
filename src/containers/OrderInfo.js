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
import ModalDialog from "../components/ModalDialog";
import {timeDifferenceForDate} from "../utils";
import {Statuses} from "../constants";

export default class OrderInfo extends Component {
	constructor(props){
		super(props);

		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);

		this.state = {
			show: false,
            
			email:"", 
			orderStatus: "",
		};
	}
    
	handleClose(){
		this.setState({show: false});
	}

	handleShow(){
		this.setState({show: true});
	}
    
	render(){
		const {orderId, userId} = this.props.match.params;
       

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
										<Heading>Status: <Badge pill variant="info">{orderInfo.status}</Badge></Heading>
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

				
				<Mutation
					mutation={UPDATE_ORDER_STATUS}
					variables={
						this.state.email,
						this.state.orderStatus

					}>
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
								>
									<Form>
										<Form.Group controlId="staus">
											<Form.Label>
												<Textbody>
                                              Choose a status
												</Textbody>
											</Form.Label>
											<Form.Control
												as="select"
												required
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
									</Form>
								</ModalDialog>
							);
						}
					}}
				</Mutation>
                      
				
			</div>
		);
	}
}