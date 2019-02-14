import React, {Component} from "react"; 
import { Query, Mutation} from "react-apollo";
import {STUDENT_ORDER_LIST}from "../graphql/Queries";
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


        this.state ={

        }
    }

    render(){
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
                    {/* THE  start of  cancel_order mutation
                    
                    key={orders.orderId}
													 variables={{
														orderId: orders.orderId,
														userId: orders.userId,
														orderStatus: this.state.orderStatus
								
													 }}
                    */}
													 <Mutation 
													 mutation={CANCEL_ORDER}
													 
													 >
													{cancelOrder => (
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
													)}
													 </Mutation>
{/* THE  END cancel_order mutation*/}

                </Container>
            </>
        )
    }
}