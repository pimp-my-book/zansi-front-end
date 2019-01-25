import React, {Component} from "react";
import { Form, Col, Container, Row} from "react-bootstrap";
import { Auth } from "aws-amplify";
import styled from "styled-components";
import PrimaryButton from "../components/PrimaryButton";
import LinkButton from "../components/LinkButton";
import DisplayMedium from "../components/typography/DisplayMedium";
import Info from "../components/Info";
import Textbody from "../components/typography/Textbody";
import SecondaryButton from "../components/SecondaryButton";

export default class StaffSignup extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: false,
            email: "",
            password: "",
            confirmPassword: "",
            error: "",
            confirmationCode: "",
            newUser: null

        };
    }

    validateForm() {
        return (
          this.state.email.length > 0 &&
          this.state.password.length > 0 &&
          this.state.password === this.state.confirmPassword
        );
      }
    
      validateConfirmationForm() {
        return this.state.confirmationCode.length > 0;
      }

    handleChange = name => event =>{
        this.setState({
            [name]: event.target.value
        });
    } 

    resendCode = async event => {
        try{
         await Auth.resendSignUp(this.state.email);
        } catch(e){
            this.setState({error: e.message});
        }
     }
 

    handleSubmit = async event => {
        event.preventDefault();

        this.setState({isLoading: true});


        try {
            const newUser = await Auth.signUp({
                username: this.state.email,
                password: this.state.password
               
            });
            console.log(newUser);
            this.setState({
                newUser
            });
        }
        catch(e){
            this.setState({error: e.message});
        }


        this.setState({isLoading: false});
    }


    handleConfirmationSubmit = async event => {
        event.preventDefault();

        this.setState({isLoading: true});

        try {
            await Auth.confirmSignUp(this.state.email, this.state.confirmationCode);
            await Auth.signIn(this.state.email,this.state.password);

            this.props.userHasAuthenticated(true);
            this.props.history.push("/dashboard");
        } catch (e){
            this.setState({isLoading: false,error: e.message});
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
                    {this.state.error && 
                       <Info 
                       text={this.state.error}
                       variant="danger"
                       />
                       }
                    <Textbody className="text-center">
                        We have sent an email to <strong>{this.state.email}</strong> with a confirmation code. 
                    </Textbody>

                        </Col>

                    </Row>

                        <Row className="justify-content-center">
                            <Col sm={8} lg={3}>
                            <Form onSubmit={this.handleConfirmationSubmit}>
                             <Form.Group>
                             <Form.Label className="text-center">Confirmation Code</Form.Label>
                             <Form.Control type="text" 
                         placeholder="The Code"
                         value={this.state.confirmationCode}
                         onChange={this.handleChange('confirmationCode')}
                         />
                             </Form.Group>
                             <PrimaryButton
             text="Verify Code"
             isLoading={this.state.isLoading}
             className="justify-content-center"
             type="submit"
          /> 
            <SecondaryButton
          className="mt-4"
             text="Resend Code"
             onClick={this.resendCode}/>
                 
                            </Form>
                            </Col>
                        </Row>
            </Container>
        )
    }

    renderSignupForm(){
        return (
            <Container>
                <Row className="justify-content-center">
                    <Col sm={6} lg={4}>
                    
                <DisplayMedium className="text-center">Staff Sign Up</DisplayMedium>
                {this.state.error && 
                       <Info 
                       text={this.state.error}
                       variant="danger"
                       />
                       }
                <Form className="justify-content-center" onSubmit={this.handleSubmit}>
                <Form.Group  controlId="email" >
                <Form.Label><Textbody>Email</Textbody></Form.Label>
                <Form.Control

                required
                type="email"
                value={this.state.email}
                onChange={this.handleChange('email')}
                />
                </Form.Group>
                <Form.Group controlId="password" >
                <Form.Label><Textbody>Password</Textbody></Form.Label>
                <Form.Control
                type="password"
                required
                
                value={this.state.password}
                onChange={this.handleChange('password')}
                               />
                               <Form.Text className="text-muted">
                           Your password needs to be a min of 8 characters with uppercase letters,
                                      contain atleast a number and special characters.
    </Form.Text>
                </Form.Group>
                <Form.Group controlId="confirmPassword" >
                <Form.Label><Textbody>Confirm Password</Textbody></Form.Label>
                <Form.Control
                type="password"
                required
                
                value={this.state.confirmPassword}
                onChange={this.handleChange('confirmPassword')}
                               />
                </Form.Group>
                <Form.Group>
                
                </Form.Group>
                
          <PrimaryButton
             text="Login"
             small="true"
             disabled={!this.validateForm()}
             className="mr-3"
             type="submit"
             isLoading={this.state.isLoading}
             
          /> 
          
         <LinkButton sm href="/login" >Already Have An Account?</LinkButton>
        
          
                </Form>
                    </Col>
                </Row>
            </Container>
            
         
        );
    }

    render(){
        return (
            <div>
                {this.state.newUser === null
                ? this.renderSignupForm()
                 : this.renderConfirmationForm()}
            </div>
        )
        
    }
}