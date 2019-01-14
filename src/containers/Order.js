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



    renderOrderConfirmationForm(){
        const {orderID, title} = this.state;
        return(
            <div>
                Your order is confirmed! 
                
                ID: <strong>{orderID}</strong>
                Book: {title}
            </div>
        )
    }

    
   

    renderOrderForm(){
        const {
            title,
            ISBN,
            author,
            edition,
            orderID,
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
                             {(order, {error, loading,called, data, _GetOrderID}) => {
                                console.log(data);
                                
                                 if (data){
                                  
                                    const newID = data.placeOrder.orderId;

                                 }
                             
                                 

                                    return(
                                        <Form onSubmit={
                                            async (e, newID) => {
                                                e.preventDefault();
                                                await order();
                                                this.setState({
                                                    newOrder: true,
                                                    orderID: newID
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
                                    {loading && <p>Loading...</p>}
                     
                                          <Form.Group controlId="title">
                                            <Form.Label>Title</Form.Label>
                                             <Form.Control
                                             required
                                             type="text"
                                             value={this.state.title}
                                             placeholder="eg: Steve Jobs"
                                             onChange={e => this.setState({title: e.target.value})}
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
                                             onChange={e => this.setState({ISBN: e.target.value})}
             
                                             />
                                          </Form.Group>
                                          <Form.Group controlId="Edition">
                                            <Form.Label>Edition</Form.Label>
                                             <Form.Control
                                             required
                                             as="input"
                                             type="text"
                                             
                                             value={this.state.edition}
                                             onChange={e => this.setState({edition: e.target.value})}
                                             />
                                          </Form.Group>
                                          <Form.Group controlId="Author">
                                            <Form.Label>Author</Form.Label>
                                             <Form.Control
                                             required
                                             type="text"
                                             
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
    
                                    )
                                
                                   
                                    
                              
                               
                                  
                             }}
                          
                           </Mutation>
                        </Col>
                        
                    </Row>

                </Container>
            </div>
        );
    }

    render(){
        return(
            <div>
                { this.state.newOrder === null 
                  ? this.renderOrderForm()
                  : this.renderOrderConfirmationForm()    
            }
            </div>
        )
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