import React ,{Component} from "react";
import styled from "styled-components";
import { Form, Col, Container, Row, Image} from "react-bootstrap";
import DisplayMedium from "../components/typography/DisplayMedium";
import DisplaySmall from "../components/typography/DisplaySmall";
import Heading from "../components/typography/Heading";
import Textbody from "../components/typography/Textbody";
import PrimaryButton from "../components/PrimaryButton";
import {PLACE_ORDER_MUTATION} from "../graphql/Mutations";
import * as query from "../graphql/Queries";
import ModalDialog from "../components/ModalDialog";
import {Mutation, Query} from "react-apollo"

export default class Order extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: false,
            show: false,
            title: "",
            ISBN: "",
            author: "",
            edition: "",
            orderID: "",
            newOrder: null

        };
        this.handleChange = this.handleChange.bind(this);

        
    }
    handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
      }


    _GetOrderID = data => {

        if (data){
            this.setState({orderID: data.placeOrder.orderId})
        }
    }

    componentDidUpdat(){
        this._GetOrderID();
    }


   
  

    componentDidMount(){
        //this.handleChange();

       
    }

    renderOrderForm(){
        const {
            title,
            ISBN,
            author,
            edition,
            orderID,
        } = this.state; 

        const SuccessImage = "https://s3.amazonaws.com/zansi-static-assest/Illustrations/undraw_winners_ao2o.svg";
        const OrderInfo = styled.div`
        width: 300px;
        height: 300px;
        box-shadow: 0px 2px 4px rgba(0,0,0,0.18); 
        `;
        return(
            <div>
                
                        <Mutation
                             mutation={PLACE_ORDER_MUTATION}
                             variables={{
                                title,
                                ISBN,
                                author,
                                edition
                             }} 
              
                             
                             >
                             {(order, {error, loading,called, data,client }) => {
                                console.log(data);
                                
                     
                                 if (called && data){
                                     return (

                                     
                                         
                                         <Container>
               
                <Row>
                    <Col>
                    <DisplayMedium className="text-center mt-4"> Order Confirmation</DisplayMedium>

                    </Col>
                   
                </Row>
                <Row >
                <Col sm={4} lg={12} >
                    <DisplaySmall className="text-center">Congrats! Your Order has been successfully processed and recieved by our staff.</DisplaySmall>
  
                    </Col>
                </Row>
                <Row >
                    <Col className="text-center mb-5">
                    <Image
                    fluid
                    width={400}
                    src={SuccessImage}
                    />
                    </Col>
                </Row>
                <Row className="justify-content-center">
                <OrderInfo className="text-center">
                 <Heading>Your Order Details</Heading>
             
                 <Textbody><strong>Order ID</strong>: {data.placeOrder.orderId} </Textbody>
                     <Textbody><strong>Title</strong>: {title}</Textbody>
                     <Textbody><strong>ISBN</strong>: {ISBN}</Textbody>  
                     <Textbody><strong>edition</strong>: {edition}</Textbody> 
                     <Textbody><strong>Author</strong>: {author}</Textbody> 
                     
                 </OrderInfo>
                </Row>
                </Container>)
                                     
                                 } else {
                                    return(
                                        <Container>
                                        <Row className="justify-content-center">
                                    <Col sm={6} lg={4}>
                                    
                                            <DisplayMedium className="text-center mt-4">Place an Order</DisplayMedium>

                                        <Form onSubmit={
                                            async e => {
                                                e.preventDefault();
                                                await order();
                                                this.setState({
                                                    newOrder: true,
                                                    
                                                });
    
                                            }}>
        
                                          {!error && !loading && called && 
                                          
                                          
                                            <div>
                                            You have successfully placed an order for {title} 
                                            your order number is : {data.placeOrder.orderId}
                                        
                                        </div>
                                        }
        
                                         {error &&
                                        <p>{error.message.replace('GraphQL error:', '')}
                                        </p>
                                    }                                  
                                    {loading && <p>Hang tight, we're busy processing your order...</p>}
                     
                                          <Form.Group controlId="title">
                                            <Form.Label>Title</Form.Label>
                                             <Form.Control
                                             required
                                             type="text"
                                             value={this.state.title}
                                             placeholder="eg: Communist Manifesto"
                                             onChange={e => this.setState({title: e.target.value})}
                                             />
                                             
                                             <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                          </Form.Group>
                                          <Form.Group controlId="ISBN">
                                            <Form.Label>ISBN</Form.Label>
                                             <Form.Control
                                             required
                                             placeholder="eg: 0199535566"
                                             as="input"
                                             type="number"
                                             value={this.state.ISBN}
                                             onChange={e => this.setState({ISBN: e.target.value})}
             
                                             />
                                          </Form.Group>
                                          <Form.Group controlId="Edition">
                                            <Form.Label>Edition</Form.Label>
                                             <Form.Control
                                             required
                                             as="input"
                                             type="text"
                                             placeholder="eg: 3rd"
                                             value={this.state.edition}
                                             onChange={e => this.setState({edition: e.target.value})}
                                             />
                                          </Form.Group>
                                          <Form.Group controlId="Author">
                                            <Form.Label>Author</Form.Label>
                                             <Form.Control
                                             required
                                             type="text"
                                             placeholder="eg: Karl Marx"
                                             value={this.state.author}
                                             onChange={e => this.setState({author: e.target.value})}
                                              />
                                          </Form.Group>
                                         
             
                            <PrimaryButton
                          text="Place Order"
                          
                          className="mr-3 "
                          type="Place Order"
                          //onClick={order}
                          //isLoading={this.state.isLoading}
                          /> 
             
                                      
                                        </Form>
                                        </Col>
                        
                        </Row>
    
                    </Container>
                                    )}
                             }}
                          
                           </Mutation>
                     
            </div>
        );
    }

    render(){
        return(
            <div>
               
                  {this.renderOrderForm()}
                  
            
            </div>
        )
    }
}


