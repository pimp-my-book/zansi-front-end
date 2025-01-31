import React, {Component} from "react"; 
import { Query, Mutation} from "react-apollo";
import { Col, Container, Row,  Badge, Form, ListGroup } from "react-bootstrap";
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

	update = (store,{data:{orderStatus, statusDate}}) => {
		const {orderId, userId} = this.props.match.params;
		 

		const data = store.readQuery({query: VIEW_ORDER, 
			variables:{
			userId,
			orderId
		}
	});
		
		  data.viewOrder.orderStatus = this.state.orderStatus;
		
		store.writeQuery({
			query: VIEW_ORDER,
			 data,
			 variables:{userId,orderId}
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
					onCompleted={this.handleClose}
					update={this.update}
					optimisticResponse={{
						__typename: "Mutation",
						updateOrderStatus: {
							__typename: "Order",
							orderId,
							orderStatus: this.state.orderStatus
							
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
				 let input,costRef,sellingRef, wayRef,dateRef,methRef,conditonRef,vendorRef,leadRef,courierRef
				 return(
					 <Mutation
					 mutation={UPDATE_ORDER_INFO}
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
										await infoUpdate(
											{
												variables: {
													orderId: orderId,
													userId: userId,
													ETA: input.value,
													Vendor: vendorRef.value,
													bookCondition: conditonRef.value,
													deliveryMethod: methRef.value ,
													deliveryDate: dateRef.value,
													costPrice: costRef.value,
													sellingPrice: sellingRef.value,
													wayBillNumber: wayRef.value,
													courierCost: courierRef.value,
													leadTime: leadRef.value
							
												}
											}

										);
									}}
									
									>
								<Form.Row>
									{error &&
									<Info
									variant="danger"
									text={error.message}
									/>
									}
									<Form.Group as={Col}>
									<Form.Label><Textbody>ETA</Textbody></Form.Label>
									<Form.Control
									type="date"
									defaultValue={orderInfo.ETA}
                                    ref={node => {input = node} }
									/>
									</Form.Group>
				
									<Form.Group as={Col}>
									<Form.Label><Textbody>Vendor</Textbody></Form.Label>
									<Form.Control
									as="select"
									defaultValue={orderInfo.Vendor}
									ref={node => {vendorRef = node}}
								
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
									ref={node => {conditonRef = node}}

									defaultValue={orderInfo.bookCondition}
									> 
                                              <option>
											Choose
											</option>
											 <option>
											TBA
											</option>
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
									
									ref={node => {methRef = node}}

									defaultValue={orderInfo.deliveryMethod}
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
									ref={node => {dateRef = node}}

									defaultValue={orderInfo.deliveryDate}
									/>
									</Form.Group>
				
									<Form.Group as={Col}>
									<Form.Label><Textbody>Cost Price</Textbody></Form.Label>
									<Form.Control
									type="text"
									ref={node => {costRef = node}}

									defaultValue={orderInfo.costPrice}
									/>
									</Form.Group>
								</Form.Row>
				
								<Form.Row>
									<Form.Group as={Col}>
									<Form.Label><Textbody> Selling Price</Textbody></Form.Label>
									<Form.Control
									type="text"									
									ref={node => {sellingRef = node}}

									defaultValue={orderInfo.sellingPrice}
									/>
									</Form.Group>
				
									<Form.Group as={Col}>
									<Form.Label><Textbody>WayBill Number</Textbody></Form.Label>
									<Form.Control
									type="text"
									ref={node => {wayRef = node}}

									defaultValue={orderInfo.wayBillNumber}
									/>
									</Form.Group>
								</Form.Row>

                                   <Form.Row>
								   <Form.Group as={Col}>
									<Form.Label><Textbody> Courier Cost</Textbody></Form.Label>
									<Form.Control
									type="text"
									ref={node => {courierRef = node}}

									defaultValue={orderInfo.courierCost}
								
									/>
									</Form.Group>
									<Form.Group as={Col}>
									<Form.Label><Textbody> Lead Time</Textbody></Form.Label>
									<Form.Control
									type="text"
									ref={node => {leadRef = node}}

									defaultValue={orderInfo.leadTime}
								
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
									 { orderInfo.orderStatus === "Beneficiary Collected" &&
                                    
                                    <Badge pill variant="success">
                                {orderInfo.orderStatus}
                                </Badge>
                                    }

                                    {orderInfo.orderStatus !== "Delivered to Beneficiary" && orderInfo.orderStatus !== null && orderInfo.orderStatus !== "received" && orderInfo.orderStatus !== "Beneficiary Collected" &&
                                    
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
										<Heading> This was last updated  {timeDifferenceForDate(parseInt(orderInfo.statusDate))}</Heading>
										 <Icon.Package 
										style={{cursor: 'pointer'}}
										onClick={this.handleShow}/> 
										<Textbody>Update Order Status</Textbody>
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

						   {/*  Order info but add fragment first */}
						   

							</Container>

							<Container>

								<Row>
									<Col lg={3}>
									<DisplayMedium>Information About This Order</DisplayMedium>
									<Col>
									 <Icon.Edit 
									style={{cursor: 'pointer'}}
									onClick={this.handleDetailsShow}/> 
									<Textbody>Edit Order Info</Textbody>
									</Col>
                                     <ListGroup>
										 <ListGroup.Item><Textbody>ETA: {orderInfo.ETA}</Textbody></ListGroup.Item>
										 <ListGroup.Item><Textbody>Vendor: {orderInfo.Vendor}</Textbody></ListGroup.Item>
										 <ListGroup.Item><Textbody>Condition: {orderInfo.bookCondition}</Textbody></ListGroup.Item>
										 <ListGroup.Item><Textbody>Delivery Method: {orderInfo.deliveryMethod}</Textbody></ListGroup.Item>
										 <ListGroup.Item><Textbody>Delivery Date: {orderInfo.deliveryDate}</Textbody></ListGroup.Item>
										 <ListGroup.Item><Textbody>Cost Price: ZAR {orderInfo.costPrice}</Textbody></ListGroup.Item>
										 <ListGroup.Item><Textbody>Selling Price: ZAR {orderInfo.sellingPrice}</Textbody></ListGroup.Item>
										 <ListGroup.Item><Textbody>Way Bill Number: {orderInfo.wayBillNumber}</Textbody></ListGroup.Item>
										 <ListGroup.Item><Textbody>Courier Cost: ZAR {orderInfo.courierCost}</Textbody></ListGroup.Item>
										 {orderInfo.orderStatus === "Delivered to Beneficiary" 
										 ? <ListGroup.Item><Textbody>Lead Time:  {this.getLeadTime(orderInfo.deliveryDate, orderInfo.excelDate)} Days</Textbody></ListGroup.Item>
										  
										 :(orderInfo.orderStatus === "Beneficiary Collected"
										 ? 	 <ListGroup.Item><Textbody>Lead Time:  {this.getLeadTime(orderInfo.deliveryDate, orderInfo.excelDate)} Days</Textbody></ListGroup.Item>
                                        :  	" "

										 )}
									 </ListGroup>
									
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