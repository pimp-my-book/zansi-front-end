import React, {Component} from "react";
import { Auth } from "aws-amplify";
import PrimaryButton from "../components/PrimaryButton";
import DisplayMedium from "../components/typography/DisplayMedium";
import Textbody from "../components/typography/Textbody";
import LinkButton from "../components/LinkButton";
import {  Form, Col,Container, Row} from "react-bootstrap";
import {Univeristies} from "../constants";

 export default class Signup extends Component {
     constructor(props){
         super(props);

         this.state = {
            isLoading: false,
            email: "",
            password: "",
            confirmPassword: "",
            studentNumber: "",
            fullName: '',
            university: "",
            degree: "",
            bursary: "",
            cellNumber: "",
            address: "",
            confirmationCode: "",
            newUser: null
         };

         this.handleChange = this.handleChange.bind(this);
         this.handleSubmit = this.handleSubmit.bind(this);
     }

     handleChange = name => event =>{
        this.setState({
            [name]: event.target.value
        });
    } 


    handleSubmit = async event => {
        event.preventDefault();

        this.setState({isLoading: true});


        try {
            const newUser = await Auth.signUp({
                username: this.state.email,
                password: this.state.password,
                attributes: {
                   'custom:studentNumber': this.state.studentNumber,
                   'custom:FullName': this.state.fullName,
                   'custom:univeristy': this.state.university,
                   'custom:degree': this.state.degree,
                   'custom:bursary': this.state.bursary,
                   'custom:cellNumber': this.state.cellNumber,
                   'custom:address': this.state.address
                }
            });
            console.log(newUser);
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


    renderConfirmationForm() {
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
                         value={this.state.confirmationCode}
                         onChange={this.handleChange('confirmationCode')}
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
                        <Col sm={1} lg={10}>

                        <Form onSubmit={this.handleSubmit}>
                    <Form.Row lg={2}>
                        <Form.Group as={Col}>
                         <Form.Label>Full Name</Form.Label>
                         <Form.Control 
                          value={this.state.fullName}
                         placeholder="eg: Steve Biko"
                         onChange={this.handleChange('fullName')}
                        
                         />
                        </Form.Group>

                        <Form.Group as={Col}>
                         <Form.Label>Email</Form.Label>
                         <Form.Control type="email" 
                         placeholder="email@example.com"
                         value={this.state.email}
                         onChange={this.handleChange('email')}
                         />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                         <Form.Label>Student Number</Form.Label>
                         <Form.Control type="number" 
                         placeholder="123456789"
                         value={this.state.studentNumber}
                         onChange={this.handleChange('studentNumber')}
                         />
                        </Form.Group>

                        <Form.Group as={Col}>
                         <Form.Label>University</Form.Label>
                         <Form.Control 
                         as="select"
                         value={this.state.university}
                         onChange={this.handleChange('university')}

                         >
                         {Univeristies.map(
                             universityOp => (
                             
                            <option
                            key={universityOp}
                            >{universityOp}</option>
                         
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
                         value={this.state.bursary}
                         onChange={this.handleChange('bursary')}
                         />
                        </Form.Group>

                        <Form.Group as={Col}>
                         <Form.Label>Degree</Form.Label>
                         <Form.Control 
                         type="text" 
                         placeholder="eg: BSC Engineering"
                         value={this.state.degree}
                         onChange={this.handleChange('degree')}
                         />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                         <Form.Label>Delivery Address</Form.Label>
                         <Form.Control as="textarea" 
                         placeholder="eg: 12 Imaginary Road"
                         value={this.state.address}
                         onChange={this.handleChange('address')}
                         />
                        </Form.Group>

                        <Form.Group as={Col}>
                         <Form.Label>Phone Number</Form.Label>
                         <Form.Control  type="number" 
                         placeholder="0745896313"
                         value={this.state.cellNumber}
                         onChange={this.handleChange('cellNumber')}

                         />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                         <Form.Label>Password</Form.Label>
                         <Form.Control type="password" 
                         placeholder="Something Secret"
                         onChange={this.handleChange('password')}
                         value={this.state.password}
                         />
                        </Form.Group>

                        <Form.Group as={Col}>
                         <Form.Label>Confirm Password</Form.Label>
                         <Form.Control  type="password" 
                         placeholder="Confirm The Secret"
                         value={this.state.confirmPassword}
                         onChange={this.handleChange('confirmPassword')}
                         />
                        </Form.Group>
                    </Form.Row>
                    <PrimaryButton
             isLoading={this.state.isLoading}
             text="Sign Up"
             loadingText="Signing up…"
             type="submit"
          /> 
                   <LinkButton className="ml-3"sm href="/Login" >Already got an Account?</LinkButton>

                </Form>

         
          
        
          
                
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }


    render(){
        return (
            <div>
                {this.state.newUser === null
                ? this.renderForm()
                : this.renderConfirmationForm()}
            </div>
        )
    }
 }