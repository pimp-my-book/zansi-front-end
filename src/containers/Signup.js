import React, {Component} from "react";
import { Auth } from "aws-amplify";
import styled from "styled-components";
import SecondaryButton from "../components/SecondaryButton";
import PrimaryButton from "../components/PrimaryButton";
import DisplayMedium from "../components/typography/DisplayMedium";
import LinkButton from "../components/LinkButton";
import { Button, Form, Col,Container, Row} from "react-bootstrap";

export default class Signup extends Component {
    constructor(props){
        super(props);

   this.state = {
       isLoading: false,
       email: "",
       password: "",
       confirmPassword: "",
       studentNumber: "",
       fullName: "",
       university: "",
       degree: "",
       bursary: "",
       cellNumber: "",
       address: "",
       confirmationCode: "",
       newUser: null
   };
    }

    //validateForm

    //validateConfirmationForm

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = async event => {
        event.preventDefault();

        this.setState({isLoading: true});

        this.setState({newUser: "test"});

        this.setState({isLaoding: false});
    }


    handleConfirmationSubmit = async event => {
        event.preventDefault();

        this.setState({isLoading: true});


    }


    renderConfirmationForm(){
        return(
            <div>
                Conform
            </div>
        )
    }

    renderForm(){
        return(
            <div>

                <Container>
                    <Row>

                        	<DisplayMedium className="mx-auto mt-4 text-center">
                    Sign Up
					</DisplayMedium>
                    </Row>
                    <Row className="justify-content-center">
                        <Col sm={8} lg={10}>
                        <Form>
                    <Form.Row lg={2}>
                        <Form.Group as={Col}>
                         <Form.Label>Full Name</Form.Label>
                         <Form.Control type="text" placeholder="eg: Steve Biko"/>
                        </Form.Group>

                        <Form.Group as={Col}>
                         <Form.Label>Email</Form.Label>
                         <Form.Control type="email" placeholder="email@example.com"/>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                         <Form.Label>Student Number</Form.Label>
                         <Form.Control type="number" placeholder="eg: Steve Biko"/>
                        </Form.Group>

                        <Form.Group as={Col}>
                         <Form.Label>University</Form.Label>
                         <Form.Control as="select">
                         {['UCT', 'TUKS', 'UFS'].map(
                             university => (
                             
                            <option>{university}</option>
                         
                             )
                         )}
                         </Form.Control>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col}>
                         <Form.Label>Bursary</Form.Label>
                         <Form.Control type="text" placeholder="eg: Steve Biko"/>
                        </Form.Group>

                        <Form.Group as={Col}>
                         <Form.Label>Degree</Form.Label>
                         <Form.Control type="text" placeholder="eg: BSC Engineering"/>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                         <Form.Label>Delivery Address</Form.Label>
                         <Form.Control as="textarea" placeholder="eg: Steve Biko"/>
                        </Form.Group>

                        <Form.Group as={Col}>
                         <Form.Label>Phone Number</Form.Label>
                         <Form.Control  type="number" placeholder="eg: BSC Engineering"/>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                         <Form.Label>Password</Form.Label>
                         <Form.Control type="password" placeholder="Something Secret"/>
                        </Form.Group>

                        <Form.Group as={Col}>
                         <Form.Label>Confirm Password</Form.Label>
                         <Form.Control  type="password" placeholder="Something Secret"/>
                        </Form.Group>
                    </Form.Row>
                </Form>

                <PrimaryButton
             text="Sign Up"
             sm
             className="mr-3"
             type="submit"
          /> 
          
         <LinkButton sm href="/Login" >Already got an Account?</LinkButton>
        
          
                
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
    render(){
        return (
            <div>
                {this.state.newUser == null
                ? this.renderForm()
                : this.renderConfirmationForm()}
            </div>
        )
    }
}