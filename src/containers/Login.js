import React, {Component} from "react";
import { Form, Col, Container, Row} from "react-bootstrap";
import { Auth } from "aws-amplify";
import styled from "styled-components";
import PrimaryButton from "../components/PrimaryButton";
import LinkButton from "../components/LinkButton";
import DisplayMedium from "../components/typography/DisplayMedium";
import Info from "../components/Info";
import Textbody from "../components/typography/Textbody";

export default class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: false,
            email: "",
            password: "",
            fullName: "",
            newPassword: "",
            passwordChallenge: false,
            newPassword: "",
            confirmNewPassord: ""
        };
    }

    validateForm(){
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    validateConfirmForm(){
        return this.state.newPassword === this.state.confirmNewPassord;
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
            await Auth.signIn(this.state.email,this.state.password);
            this.props.userHasAuthenticated(true);
        } catch (e){
            alert(e.message);
        }
        this.setState({isLoading: false});

    }

    renderLoginForm(){
        return (
            <Container>
                <Row className="justify-content-center">
                    <Col sm={6} lg={4}>
                    
                <DisplayMedium className="text-center">Welcome Back!</DisplayMedium>
             
                <Form className="justify-content-center" onSubmit={this.handleSubmit}>
                <Form.Group  controlId="email" >
                <Form.Label>Email</Form.Label>
                <Form.Control

                required
                type="email"
                value={this.state.email}
                onChange={this.handleChange('email')}
                />
                </Form.Group>
                <Form.Group controlId="password" >
                <Form.Label>Password</Form.Label>
                <Form.Control
                type="password"
                required
                
                value={this.state.password}
                onChange={this.handleChange('password')}
                               />
                </Form.Group>
                <Form.Group>
                <LinkButton sm href="/forgot-password" >
                Forgot Your Password?
                </LinkButton>
                </Form.Group>
                
          <PrimaryButton
             text="Login"
             small="true"
             disabled={!this.validateForm()}
             className="mr-3"
             type="submit"
             isLoading={this.state.isLoading}
             
          /> 
          
         <LinkButton sm href="/signup" >Don't Have An Account?</LinkButton>
        
          
                </Form>

                    </Col>
                </Row>
            </Container>
            
         
        );
    }

    renderChallengeForm(){
        return(
            <Container>
                <Row className="justify-content-center">

                    <Col sm={6} lg={4}>
                    <DisplayMedium className="text-center">Reset Password</DisplayMedium>
                       {this.state.emailError && 
                       <Info 
                       text={this.state.emailError}
                       variant="danger"
                       />
                       }
                       <Textbody>Please Provide us with your email address so we verify you. </Textbody>
                      
                       <Form onSubmit={this.handleSendCodeClick}>
                           <Form.Group controlId="newPassword">
                           <Form.Label>New Password</Form.Label>
                           <Form.Control 
                           required
                           type="email"
                           value={this.state.newPassword}
                           onChange={this.handleChange}
                           />

                           </Form.Group>
                           <Form.Group controlId="confirmNewPassord">
                           <Form.Label>Confirm Password</Form.Label>
                           <Form.Control 
                           required
                           type="password"
                           value={this.state.confirmNewPassord}
                           onChange={this.handleChange}
                           />

                           </Form.Group>
                           <PrimaryButton
                           type="submit"
                           loadingText="Creating..."
                           text="Confirm New Password"
                           isLoading={this.state.isSendingCode}
                           disabled={!this.validateConfirmForm()}
                           />
                       </Form>
                    </Col>
                </Row>
            </Container>
        )
    }

    render(){
        return(
            <div>
                {this.state.passwordChallenge 
                ? this.renderLoginForm()
                : this.renderChallengeForm()}
            </div>
        )
    }
}