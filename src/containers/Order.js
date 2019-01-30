import React ,{Component} from "react";
import styled from "styled-components";
import {Mutation} from "react-apollo";
import { Form, Col, Container, Row, Image,Alert} from "react-bootstrap";
import DisplayMedium from "../components/typography/DisplayMedium";
import DisplaySmall from "../components/typography/DisplaySmall";
import Heading from "../components/typography/Heading";
import Textbody from "../components/typography/Textbody";
import PrimaryButton from "../components/PrimaryButton";
import LoadingSpinner from "../components/LoadingSpinner";
import LinkButton from "../components/LinkButton";
import {PLACE_ORDER_MUTATION} from "../graphql/Mutations";
import {STUDENT_ORDER_LIST} from "../graphql/Queries";
import Info from "../components/Info";


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
            newOrder: null

        };
        this.handleChange = this.handleChange.bind(this);

        
    }
    handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
      }


   update = (store, {data: {order}}) => {
       const data = store.readQuery({
           query: STUDENT_ORDER_LIST
       });
       data.orderList.unshift(order)
       store.writeQuery({
           query: STUDENT_ORDER_LIST,
           data
       })
   }

   
  


    renderOrderForm(){
        const {
            title,
            ISBN,
            author,
            edition,
            
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
                             update={this.update}
                             
                             >
                             {(order, {error, loading,called, data,client }) => {
                                
                     
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
<Info
text="Please keep your Order ID stored somewhere safe, as we will need this to easily help you incase an issue arises."
variant="warning"
/>
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

<Textbody><strong>Order ID</strong>: {data.placeOrder.orderId}</Textbody>
<Textbody><strong>Title</strong>: {title}</Textbody>
<Textbody><strong>ISBN</strong>: {ISBN}</Textbody>  
<Textbody><strong>edition</strong>: {edition}</Textbody> 
<Textbody><strong>Author</strong>: {author}</Textbody> 
<LinkButton href="/order">Place another order!</LinkButton>

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
                                                    isLoading:true
                                                });
    
                                            }}>
        
                                   
        
                                         {error &&
                                        <p>{error.message.replace('GraphQL error:', '')}
                                        </p>
                                    }                                  
                                    {loading && 
                                    
                                    
                                    <Alert 
                                    variant="primary"
                                    >
                                    <Textbody>Hang tight, we're busy processing your order...</Textbody>
                                    <Container>
                                        <Row className="justify-content-center">
                                            <Col>
                                            <LoadingSpinner/>
                                            </Col>
                                        </Row>
                                    </Container>
                                    </Alert>
                                    }
                     
                                          <Form.Group controlId="title">

                                            <Form.Label>
                                                <Textbody> 
                                                    Title
                                                    </Textbody>
                                                    </Form.Label>
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
                                            <Form.Label>
                                            <Textbody> 
                                                ISBN
                                                </Textbody> 
                                                </Form.Label>
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
                                          <Form.Label>
                                            <Textbody> 
                                                Edition
                                                </Textbody> 
                                                </Form.Label>
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
                                          <Form.Label>
                                            <Textbody> 
                                                Author
                                                </Textbody> 
                                                </Form.Label>
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
                          isLoading={this.state.isLoading}
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


