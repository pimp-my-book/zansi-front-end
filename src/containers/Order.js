import React ,{Component} from "react";
import styled from "styled-components";
import { Form, Col, Container, Row} from "react-bootstrap";
import DisplayMedium from "../components/typography/DisplayMedium";
import PrimaryButton from "../components/PrimaryButton";


export default class Order extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: false

        };
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
                                />
                             </Form.Group>
                             <Form.Group controlId="ISBN">
                               <Form.Label>ISBN</Form.Label>
                                <Form.Control
                                required
                                type="text"
                                />
                             </Form.Group>
                             <Form.Group controlId="Edition">
                               <Form.Label>Edition</Form.Label>
                                <Form.Control
                                required
                                type="text"
                                />
                             </Form.Group>
                             <Form.Group controlId="Author">
                               <Form.Label>Author</Form.Label>
                                <Form.Control
                                required
                                type="text"
                                />
                             </Form.Group>
                             <PrimaryButton
             text="Login"
             small="true"
             className="mr-3"
             type="submit"
             isLoading={this.state.isLoading}
             
          /> 
                           </FormStyles>
                        </Col>
                        
                    </Row>

                </Container>
            </OrderBackground>
        );
    }
}