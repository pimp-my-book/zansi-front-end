import React ,{Component} from "react";
import styled from "styled-components";
import { Form, Col, Container, Row} from "react-bootstrap";
import DisplayMedium from "../components/typography/DisplayMedium";
import PrimaryButton from "../components/PrimaryButton";
import PLACE_ORDER_MUTATION from "../constants";
import {Mutation} from 'react-apollo';
import ModalDialog from "../components/ModalDialog";

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

        this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    }

    handleClose(){
        this.setState({show: false});
    }

    handleShow(){
        this.setState({show: true});
    }

    renderSuccess(){
        return(
            <div>
                You have placed an order!
            </div>
        )
    }

    render(){
        const OrderBackground = styled.div`
          background-color: white;
          height: 100vh;

        `;
    

        const FormStyles = styled(Form)`
        width: 500px;
        box-shadow: 0px 2px 4px var(--bubblegum);
        paddig: 30px;
        `;

        const {
            title,
            ISBN,
            author,
            edition,
        } = this.state 
        return(
            <OrderBackground>
                <Container>
                    <Row className="justify-content-center">
                <Col sm={6} lg={4}>
                
                        <DisplayMedium className="text-center mt-4">Place an Order</DisplayMedium>
                           <FormStyles>
                             <Form.Group controlId="title">
                               <Form.Label>Title</Form.Label>
                                <Form.Control
                                required
                                type="text"
                                value={title}
                                onChange={this.handleChange('title')}
                                />
                             </Form.Group>
                             <Form.Group controlId="ISBN">
                               <Form.Label>ISBN</Form.Label>
                                <Form.Control
                                required
                                type="text"
                                value={ISBN}
                                onChange={this.handleChange('ISBN')}

                                />
                             </Form.Group>
                             <Form.Group controlId="Edition">
                               <Form.Label>Edition</Form.Label>
                                <Form.Control
                                required
                                type="text"
                                value={edition}
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
             type="submit"
             onClick={this.handleShow}
             //isLoading={this.state.isLoading}
             /> 

                          <ModalDialog
                             show={this.state.show}
                             onHide={this.handleClose}
                             title="test"
                             body="haha ahah has"
                             buttonText="Place Order"
                             onClick={this.renderSuccess()}
                             />
                           </FormStyles>
                        </Col>
                        
                    </Row>

                </Container>
            </OrderBackground>
        );
    }
}

/*

  <Mutation
                             mutation={PLACE_ORDER_MUTATION}
                             variables={{
                                title,
                                ISBN,
                                author,
                                edition
                             }}
                             >
                           
             </Mutation>
*/