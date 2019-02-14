import React, {Component} from "react"; 
import { Query, Mutation} from "react-apollo";
import {VIEW_ORDER}from "../graphql/Queries";
import { CANCEL_ORDER}from "../graphql/Mutations";
import { Col, Container, Row,  Badge, Form, Collapse, ListGroup } from "react-bootstrap";
import * as Icon from "react-feather";
import DisplayLarge from "../components/typography/DisplayLarge";
import DisplayMedium from "../components/typography/DisplayMedium";
import Heading from "../components/typography/Heading";
import Textbody from "../components/typography/Textbody";
import LoadingSpinner from "../components/LoadingSpinner";
import Info from "../components/Info";
import PrimaryButton from "../components/PrimaryButton";
import ModalDialog from "../components/ModalDialog";
import {timeDifferenceForDate} from "../utils";

export default class CancelOrder extends Component {
    constructor(props){
        super(props);
        this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleChange = this.handleChange.bind(this);


        this.state ={
            show: false,
            orderStatus: ""
        }
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

        return (
            <>
            <Container>
					<Row>
						<Col>
							<DisplayLarge>
                        Cancel Your Order
							</DisplayLarge>
						</Col>
					</Row>
				</Container>

                  <Container>
                    <Query
                     query={VIEW_ORDER}
                     variables={{
                         orderId: orderId,
                         userId: userId
                     }}
                     
                    >
                    {({error, loading, data}) => {
						if (loading) return <LoadingSpinner/>;
						if (error) return <Info
						text={`${error}`}
                        variant="danger"/>;

                        const orderInfo = data.viewOrder;

                        return (
                            
                            <Mutation 
                            mutation={CANCEL_ORDER}
                              variables={{
                              orderId: orderId,
                              userId: userId,
                             orderStatus: this.state.orderStatus

                            }}>
                             {/* THE  start of  cancel_order mutation*/}
                           {(cancelOrder, {error, loading, called}) => {

                               if (called) {
                                   return (
                                    <Info
                                    variant="success"
                                    text="This order has been requested to be cancelled."
                                    />
                                   )
                               } else {
                                   return (
                                       <>
                                                                                 

                               
{/* THE MODAL TO UPDATE THE STATUS TO CANCEL*/}
<ModalDialog
show={this.state.show}
onHide={this.handleClose}
title="Cancel Your Order"
>
<Form onSubmit={
async e => {
e.preventDefault();
await cancelOrder()
}
}>
{error &&
    <Info
    variant="danger"
    text={error.message}
    />
    }
<Form.Group controlId="staus">
<Form.Label>
<Textbody>
Choose a status
</Textbody>
</Form.Label>
<Form.Control
as="select"
required
value={this.state.orderStatus}
onChange={this.handleChange('orderStatus')}
>


<option>
Choose
</option>
<option>
Cancel Request
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

{/* THE  END MODAL TO UPDATE THE STATUS TO CANCEL*/}

                                       </>
                                   )
                               }
                                
                                
                           }}
                           {/* THE  END cancel_order mutation*/}
                            </Mutation>


                        )
                        
                     }}
                       
                    </Query>
                   
												

                </Container>
                <Container>
                    
                        <Query
                     query={VIEW_ORDER}
                     variables={{
                         orderId: orderId,
                         userId: userId
                     }}>
                     {({error, loading, data}) => {

                        if (loading) return <LoadingSpinner/>;
						if (error) return <Info
						text={`${error}`}
                        variant="danger"/>;

                        const orderInfo = data.viewOrder;

                       return(
                        <Row>
                            
                        <Col lg={8}>
                        <Heading>You ordered {orderInfo.title} , {orderInfo.edition} Edtion by {orderInfo.author} {timeDifferenceForDate(parseInt(orderInfo.dateOrdered))}.</Heading>
                        <Heading>For reference here is the Order ID: {orderInfo.orderId} </Heading>
                        
                        
                        </Col>

                        <Col lg={2}>
                            <Textbody>
                            <Icon.Trash2 
							style={{cursor: 'pointer'}}
							onClick={this.handleShow}/> 
							Cancel Order</Textbody>
                            </Col>
                    </Row>
                       )

                     }}

                    </Query>
                    
                        
                </Container>
              

              
            </>
        )
    }
}