import React, {Component} from "react"; 
import { Query, Mutation} from "react-apollo";
import { Col, Container, Row,  Badge, Form, Collapse } from "react-bootstrap";
import {VIEW_ORDER}from "../graphql/Queries";
import { UPDATE_ORDER_STATUS, UPDATE_ORDER_INFO}from "../graphql/Mutations";
import * as Icon from "react-feather";
import DisplayLarge from "../components/typography/DisplayLarge";
import DisplayMedium from "../components/typography/DisplayMedium";
import Heading from "../components/typography/Heading";
import Textbody from "../components/typography/Textbody";
import LoadingSpinner from "../components/LoadingSpinner";
import LinkButton from "../components/LinkButton";
import Info from "../components/Info";
import PrimaryButton from "../components/PrimaryButton";
import ModalDialog from "../components/ModalDialog";
import {timeDifferenceForDate} from "../utils";
import {Statuses, Vendors, DeliveryMethod} from "../constants";


export default class OrderInfo extends Component {
	constructor(props){
		super(props);

		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleDetailsClose = this.handleDetailsClose.bind(this);
		this.handleDetailsShow = this.handleDetailsShow.bind(this);

		this.state = {
			show: false,
			showDetails: false,
			openInfo: false,
			eta : "",
			costPrice : "",
			sellingPrice: "",
			wayBillNumber: "", 
			deliveryDate : "",
			deliveryMethod: "",
			conditon : "",
			vendor : "",
			leadTime: "",
			
			orderStatus: "",
		};
	}
    
	handleClose(){
		this.setState({show: false});
	}

	handleShow(){
		this.setState({show: true});
	}
	
	handleDetailsClose(){
		this.setState({showDetails: false});
	}

	handleDetailsShow(){
		this.setState({showDetails: true});
	}

    handleChange = name => event =>{
        this.setState({
            [name]: event.target.value
        });
    } 



	getLeadTime = (date1, date2) => {
		const orderDate = new Date(date1);
		const deliverDate = new Date(date2);

		const timeDiff = Math.abs(deliverDate.getTime() - orderDate.getTime());
		const leadTimeCal =  Math.ceil(timeDiff / (1000 * 3600 * 24));
		//this.setState({leadTime: leadTimeCal});
		return leadTimeCal;
	}

	update = (cache,payload) => {
		const {orderId, userId} = this.props.match.params;

		const data = cache.readQuery({query: VIEW_ORDER, variables:{
			userId,
			orderId
		}});
		const orderItemID = payload.data.viewOrder.orderId;
		
		console.log(data.viewOrder);
		 delete data.viewOrder;
		console.log(data.viewOrder);
		cache.writeQuery({
			query: VIEW_ORDER,
			 data,
			 variables:{userId,orderId}
			});
	}

	render(){
		const {orderId, userId} = this.props.match.params;
       const {orderStatus, openInfo} = this.state;

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


{/*START OF   UPDATE ORDER STATUS MODAL*/}
				
                <Query 
					query={VIEW_ORDER}
					variables={{
						orderId: orderId,
						userId: userId}}
				>
					{({error, loading, data}) => {
						if (loading) return <LoadingSpinner/>;
						if (error) return <Info
						text={`${error}`}
						variant="danger"/>;

						const orderInfo = data.viewOrder;
                        return (
                            <Mutation
					mutation={UPDATE_ORDER_STATUS}
					variables={{
                        orderId: orderId,
						userId: userId,
                        email: orderInfo.email,
						orderStatus

					}}
					update={this.update}
					optimisticResponse={{
						__typename: "Mutation",
						viewOrder: {
							__typename: "Order",
							orderId,
							
						}
					}}
					refetchQueries={[{query:VIEW_ORDER} ]}
					>
					{(statusUpdate , {error, loading, called}) => {
						if(called){
							return  (
								<Info
								variant="success"
								text="The status of the order has been updated!"
								/>
							);
						} else {
							return(
								
								<ModalDialog
									show={this.state.show}
									onHide={this.handleClose}
									title="Update Order Status"
                                     
                                >
								<Form onSubmit={
									async e => {
									 e.preventDefault();
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
{/*END OF   UPDATE ORDER STATUS MODAL*/}


{/* START OF UPDATE ORDER INFO MODAL*/}


               <Query
			   query={VIEW_ORDER}
			   variables={{
				orderId: orderId,
				userId: userId}}
			   >
			   {({error, loading, data}) => {
				   if (loading) return <></>;
				   if (error) return <Info
				   text={`${error}`}
				   variant="danger"/>;

				 const orderInfo = data.viewOrder;
				 return(
					 <Mutation
					 mutation={UPDATE_ORDER_INFO}
					variables={{
                        orderId: orderId,
						userId: userId,
						ETA: this.state.eta,
						Vendor: this.state.vendor,
						bookCondition: this.state.conditon,
						deliveryMethod: this.state.deliveryMethod,
						deliveryDate: this.state.deliveryDate,
						costPrice: this.state.costPrice,
						sellingPrice: this.state.sellingPrice,
						wayBillNumber: this.state.wayBillNumber,
						leadTime: this.state.leadTime

					}}
					 >
                      {(infoUpdate, {error, loading, called}) => {

                        if(called && !error){
							return (
								<Info
								variant="success"
								text="The order info has been updated!"
								/>
							)
						} else {
							return (
								<ModalDialog
								show={this.state.showDetails}
								onHide={this.handleDetailsClose}
								title="Update Order Details"
								>
								<Form
								onSubmit={
									async e => {
										e.preventDefault();
										await infoUpdate();
									}}>
								<Form.Row>
									{error &&
									<p>{error.message}</p>
									}
									<Form.Group as={Col}>
									<Form.Label><Textbody>ETA</Textbody></Form.Label>
									<Form.Control
									type="date"
									value={this.state.eta}
									onChange={this.handleChange('eta')}
									/>
									</Form.Group>
				
									<Form.Group as={Col}>
									<Form.Label><Textbody>Vendor</Textbody></Form.Label>
									<Form.Control
									as="select"
									value={this.state.vendor}
									onChange={this.handleChange('vendor')}
									> 
                                    {Vendors.map(
										vendorOp => (
											<option
											key={vendorOp}
											>
											{vendorOp}
											</option>
										)
									)}

									</Form.Control>
									</Form.Group>
								</Form.Row>
				
								<Form.Row>
									<Form.Group as={Col}>
									<Form.Label><Textbody>Condition</Textbody></Form.Label>
									<Form.Control
									as="select"
									value={this.state.conditon}
									onChange={this.handleChange('conditon')}
									> 
                                   
											<option>
											New
											</option>
											<option>
											Used
											</option>
								

									</Form.Control>
									</Form.Group>
				
									<Form.Group as={Col}>
									<Form.Label><Textbody> Delivery Method</Textbody></Form.Label>
									<Form.Control
									as="select"
									value={this.state.deliveryMethod}
									onChange={this.handleChange('deliveryMethod')}
									> 
                                    {DeliveryMethod.map(
										methodOp => (
											<option
											key={methodOp}
											>
											{methodOp}
											</option>
										)
									)}

									</Form.Control>
									</Form.Group>
								</Form.Row>
				
				
								<Form.Row>
									<Form.Group as={Col}>
									<Form.Label><Textbody>Delivery Date</Textbody></Form.Label>
									<Form.Control
									type="date"
									value={this.state.deliveryDate}
									onChange={this.handleChange('deliveryDate')}
									/>
									</Form.Group>
				
									<Form.Group as={Col}>
									<Form.Label><Textbody>Cost Price</Textbody></Form.Label>
									<Form.Control
									type="number"
									value={this.state.costPrice}
									onChange={this.handleChange('costPrice')}
									/>
									</Form.Group>
								</Form.Row>
				
								<Form.Row>
									<Form.Group as={Col}>
									<Form.Label><Textbody> Selling Price</Textbody></Form.Label>
									<Form.Control
									type="number"
									value={this.state.sellingPrice}
									onChange={this.handleChange('sellingPrice')}
									/>
									</Form.Group>
				
									<Form.Group as={Col}>
									<Form.Label><Textbody>WayBill Number</Textbody></Form.Label>
									<Form.Control
									type="text"
									value={this.state.wayBillNumber}
									onChange={this.handleChange('wayBillNumber')}
									/>
									</Form.Group>
								</Form.Row>

                                   <Form.Row>
									<Form.Group as={Col}>
									<Form.Label><Textbody> Lead Time</Textbody></Form.Label>
									<Form.Control
									type="text"
									readOnly 
									plainText
									value={this.getLeadTime(orderInfo.deliveryDate, orderInfo.excelDate)}
									onChange={this.handleChange('leadTime')}
									/>
									</Form.Group>
				
									
								</Form.Row>

								
								<PrimaryButton
											text="Update Info"
											type="submit"
											/>
								</Form>
				
				
								</ModalDialog>
				
				
							)
						}
              
					  }}

					 </Mutation>
				 )

			   }}


				</Query>

{/* END OF  UPDATE ORDER INFO MODAL*/}
               

{/* START OF  Order Infomation*/}

                
				<Query 
					query={VIEW_ORDER}
					variables={{
						orderId: orderId,
						userId: userId
					}}
					
				>
					{({error, loading, data, startPolling, stopPolling}) => {
						if (loading) return <></>;
						if (error) return <Info
                            text={`${error}`}
                            variant="danger"/>;;
						const orderInfo = data.viewOrder;
						console.log(orderInfo);
						
						return(
							<>
							<Container>
								<Row className="mb-5">
									<Col>
                                        <Heading>Status: {' '}

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
                                        <Icon.Package onClick={this.handleShow}/> <Textbody>Update Order Status</Textbody>
									</Col>
									<Col>
                                    <Icon.Edit onClick={this.handleDetailsShow}/> <Textbody>Edit Order Info</Textbody>
									</Col>
								</Row>
								<Row>
									<Col>
										<DisplayMedium><Icon.Info/> {orderInfo.orderId}</DisplayMedium>
                             
										<Heading><Icon.Book/>{orderInfo.title}</Heading>
										<Heading>ISBN: {orderInfo.ISBN}</Heading>
										<Heading>Author: {orderInfo.author}</Heading>
										<Heading>Edition: {orderInfo.edition}</Heading>
                                
								         {this.getLeadTime(orderInfo.deliveryDate, orderInfo.excelDate)}
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

						   {/*  Order info but add fragment first */}
						   

							</Container>

							<Container>

								<Row>
									<Col>
									<DisplayMedium>Information About This Order</DisplayMedium>
                                     
									
									</Col>
								</Row>

								
							</Container>

                        </>
                        
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

				{/*  Order Infomation*/}
			</div>
		);
	}
}