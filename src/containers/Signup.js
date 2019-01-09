import React, {Component} from "react";
import { Auth } from "aws-amplify";
import styled from "styled-components";
import SecondaryButton from "../components/SecondaryButton";
import PrimaryButton from "../components/PrimaryButton";
import DisplayMedium from "../components/typography/DisplayMedium";
import Textbody from "../components/typography/Textbody";
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
       newUser: true
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


        try {
            const newUser = await Auth.signIn({
                username: this.state.email,
                password: this.state.password,
                attributes: {
                   'studentNumber': this.state.studentNumber,
                   'FullName': this.state.FullName,
                   'univeristy': this.state.university,
                   'degree': this.state.degree,
                   'bursary': this.state.bursary,
                   'cellNumber': this.state.cellNumber,
                   'address': this.state.address
                }
            });
            this.setState({
                newUser
            });
        }
        catch(e){
            alert(e.message);
        }

        //this.setState({newUser: "test"});

        this.setState({isLoading: false});
    }


    handleConfirmationSubmit = async event => {
        event.preventDefault();

        this.setState({isLoading: true});

        try {
            await Auth.confirmSignUp(this.state.email, this.state.confirmationCode);
            await Auth.signIn(this.state.email,this.state.password);

            this.props.userHasAuthenticated(true);
            this.props.history.push("/");
        } catch (e){
            alert(e.message);
            this.setState({isLoading: false});
        }

    }


    renderConfirmationForm(){
        return(
            <Container>
                    <Row>
                        <Col>
                        <DisplayMedium className="mx-auto mt-4 text-center">
                    Confirmation Code
					</DisplayMedium>
                    <Textbody className="text-center">
                        We have sent an email to <strong>{this.state.email}</strong> with a confirmation code. 
                    </Textbody>
                        </Col>

                    </Row>

                        <Row className="justify-content-center">
                            <Col sm={8} lg={3}>
                            <Form onSubmit={this.handleConfirmationSubmit}>
                             <Form.Group>
                             <Form.Label classname="text-center">Confirmation Code</Form.Label>
                             <Form.Control type="text" 
                         placeholder="The Code"
                         onChange={this.handleChange}
                         />
                             </Form.Group>
                             <PrimaryButton
             text="Verify Code"
             
             className="justify-content-center"
             type="submit"
          /> 
                            </Form>
                            </Col>
                        </Row>
            </Container>
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
                        <Form onSubmit={this.handleSubmit}>
                    <Form.Row lg={2}>
                        <Form.Group as={Col}>
                         <Form.Label>Full Name</Form.Label>
                         <Form.Control type="text" 
                         placeholder="eg: Steve Biko"
                         onChange={this.handleChange}
                         />
                        </Form.Group>

                        <Form.Group as={Col}>
                         <Form.Label>Email</Form.Label>
                         <Form.Control type="email" 
                         placeholder="email@example.com"
                         onChange={this.handleChange}
                         />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                         <Form.Label>Student Number</Form.Label>
                         <Form.Control type="number" 
                         placeholder="eg: Steve Biko"
                         onChange={this.handleChange}
                         />
                        </Form.Group>

                        <Form.Group as={Col}>
                         <Form.Label>University</Form.Label>
                         <Form.Control 
                         as="select"
                         onChange={this.handleChange}
                         >
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
                         <Form.Control 
                         type="text" 
                         onChange={this.handleChange}
                         />
                        </Form.Group>

                        <Form.Group as={Col}>
                         <Form.Label>Degree</Form.Label>
                         <Form.Control 
                         type="text" 
                         placeholder="eg: BSC Engineering"
                         onChange={this.handleChange}
                         />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                         <Form.Label>Delivery Address</Form.Label>
                         <Form.Control as="textarea" 
                         placeholder="eg: 12 Imaginary Road"
                         />
                        </Form.Group>

                        <Form.Group as={Col}>
                         <Form.Label>Phone Number</Form.Label>
                         <Form.Control  type="number" 
                         placeholder="eg: BSC Engineering"
                         onChange={this.handleChange}

                         />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                         <Form.Label>Password</Form.Label>
                         <Form.Control type="password" 
                         placeholder="Something Secret"
                         onChange={this.handleChange}
                         />
                        </Form.Group>

                        <Form.Group as={Col}>
                         <Form.Label>Confirm Password</Form.Label>
                         <Form.Control  type="password" 
                         placeholder="Something Secret"
                         onChange={this.handleChange}
                         />
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