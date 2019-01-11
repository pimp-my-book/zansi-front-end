import React ,{Component} from "react";
import styled from "styled-components";
import { Form, Col, Container, Row} from "react-bootstrap";
import DisplayMedium from "../components/typography/DisplayMedium";
import PrimaryButton from "../components/PrimaryButton";
import {PLACE_ORDER_MUTATION} from "../graphql/Mutations";
import ModalDialog from "../components/ModalDialog";
import {Mutation} from "react-apollo"

export default class Order extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: false,
            show: false,
            title: "",
            ISBN: "",
            author: "",
            edition: ""

        };
        this.handleChange = this.handleChange.bind(this);

        
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    }

   

    renderOrderForm(){
       
    

   

        const {
            title,
            ISBN,
            author,
            edition,
        } = this.state; 
        return(
            <div>
                <Container>
                    <Row className="justify-content-center">
                <Col sm={6} lg={4}>
                
                        <DisplayMedium className="text-center mt-4">Place an Order</DisplayMedium>
                        <Mutation
                             mutation={PLACE_ORDER_MUTATION}
                             variables={{
                                title,
                                ISBN,
                                author,
                                edition
                             }} 
                             onCompleted={() => alert(`you place this order ${title}`)}
                             >
                             {(order, {error, loading,called, data}) => {
                                console.log(data);
                                return(
                                    <Form onSubmit={
                                        async e => {
                                            e.preventDefault();
                                            await order();
                                            
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
                                {loading && <p>Loading...</p>}
                 
                                      <Form.Group controlId="title">
                                        <Form.Label>Title</Form.Label>
                                         <Form.Control
                                         required
                                 
                                         
                                         type="text"
                                         value={this.state.title}
                                         placeholder="eg: Steve Jobs"
                                         onChange={this.handleChange('title')}
                                         />
                                         
                                         <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                      </Form.Group>
                                      <Form.Group controlId="ISBN">
                                        <Form.Label>ISBN</Form.Label>
                                         <Form.Control
                                         required
                                         
                                         as="input"
                                         type="number"
                                         value={this.state.ISBN}
                                         onChange={this.handleChange('ISBN')}
         
                                         />
                                      </Form.Group>
                                      <Form.Group controlId="Edition">
                                        <Form.Label>Edition</Form.Label>
                                         <Form.Control
                                         required
                                         as="input"
                                         type="text"
                                         
                                         value={this.state.edition}
                                         onChange={this.handleChange('edition')}
                                         />
                                      </Form.Group>
                                      <Form.Group controlId="Author">
                                        <Form.Label>Author</Form.Label>
                                         <Form.Control
                                         required
                                         type="text"
                                         
                                         value={author}
                                         onChange={this.handleChange('author')}
                                         />
                                      </Form.Group>
                                     
         
                        <PrimaryButton
                      text="Login"
                      small="true"
                      className="mr-3"
                      type="Place Order"
                      //onClick={order}
                      //isLoading={this.state.isLoading}
                      /> 
         
                                  
                                    </Form>

                                )
                                  
                             }}
                          
                           </Mutation>
                        </Col>
                        
                    </Row>

                </Container>
            </div>
        );
    }
}


/*

 <ModalDialog
                             show={this.state.show}
                             onHide={this.handleClose}
                             title="test"
                             body="haha ahah has"
                             buttonText="Place Order"
                             onClick={this.renderSuccess()}
                             /> */