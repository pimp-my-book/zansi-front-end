import React, {Component} from "react";
import { Auth } from "aws-amplify";
import PrimaryButton from "../components/PrimaryButton";
import DisplayMedium from "../components/typography/DisplayMedium";
import Textbody from "../components/typography/Textbody";
import LinkButton from "../components/LinkButton";
import Info from "../components/Info";
import {  Form, Col,Container, Row, Image} from "react-bootstrap";


export default class ForgotPassword extends Component {
	constructor(props){
		super(props);

        this.state = {
            email: "",
            code: "",
            password: "",
            codeSent: false,
            confirmed: false, 
            confirmPassword: "",
            isConfirming: false,
            isSendingCode: false,
            //errors to display on RequestCodeForm
            emailError: "",
             //errors to display on ConfirmationForm
            confirmError: ""
        };
    }
    
    //Validation for code form
    validateCodeForm(){
        return this.state.email.length > 0;
    }

    //Validation for reset form

    validateResetForm(){
        return (
            this.state.code.length > 0 && 
            this.state.password.length > 0 && 
            this.state.password === this.state.confirmPassword
        );
    }


    //handle Change
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }


    /// Sumbit event for Sending code to email

    handleSendCodeClick = async event => {
        event.preventDefault();

        this.setState({isSendingCode: true});

        try {
            await Auth.forgotPassword(this.state.email);
            this.setState({codeSent: true});
        } catch (e) {
            //alert(e.message);
            this.setState({emailError: e.message,
                isSendingCode: false});
        }
    }


    ///Submit event for confirming code and submitting a new password

     handleConfirmClick = async event => {
         event.preventDefault();

         this.setState({isConfirming: true});

         try {
             await Auth.forgotPasswordSubmit(
                 this.state.email,
                 this.state.code,
                 this.state.password
             );
             this.setState({confirmed: true});
         } catch (e){
            alert(e.message);
            this.setState({confirmError: e.message, isConfirming: false});
         }
     }


    //renderRequestCodeForm
    renderRequestCodeForm(){
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
                           <Form.Group controlId="email">
                           <Form.Label>Email</Form.Label>
                           <Form.Control 
                           required
                           type="email"
                           value={this.state.email}
                           onChange={this.handleChange}
                           />

                           </Form.Group>
                           <PrimaryButton
                           type="submit"
                           loadingText="Sending..."
                           text="Send Confirmation"
                           isLoading={this.state.isSendingCode}
                           disabled={!this.validateCodeForm()}
                           />
                       </Form>
                    </Col>
                </Row>
            </Container>
        );
    }


    ///renderConfirmationForm
    renderConfirmationForm(){
        return(
            <Container>
                <Row className="justify-content-center">
                <Col sm={6} lg={4}>
                    <DisplayMedium className="text-center">Confirmation Form</DisplayMedium>
                       <p>Check your email : {this.state.email} for the confirmaton code!</p>
                       {this.state.confirmError && 
                         <Info 
                         text={this.state.confirmError}
                         variant="danger"
                         />
                        }
                       <Form onSubmit={this.handleConfirmClick}>
                       <Form.Group controlId="code">
                       <Form.Label>Confirmation Code</Form.Label>
                       <Form.Control
                        type="tel"
                        value={this.state.code}
                        onChange={this.handleChange}
                       />
                       </Form.Group>
                       <Form.Group controlId="password">
                       <Form.Label>Password</Form.Label>
                       <Form.Control
                        type="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                       />
                       </Form.Group>
                       <Form.Group controlId="confirmPassword">
                       <Form.Label>Confirm Password</Form.Label>
                       <Form.Control
                        type="password"
                        value={this.state.confirmPassword}
                        onChange={this.handleChange}
                       />
                       </Form.Group>
                       <PrimaryButton
                           type="submit"
                           loadingText="Confirming..."
                           text="Confirm"
                           isLoading={this.state.isConfirming}
                           disabled={!this.validateCodeForm()}
                           />
                       </Form>
                    </Col>
                </Row>
            </Container>
        )
    }

    //render success message
    renderSuccessMessage(){
        const ImgURL = "https://s3.amazonaws.com/zansi-static-assest/Illustrations/undraw_finish_line_katerina_limpitsouni_xy20.svg";
        return(
            <Container>
                <Row className="justify-content-center">
                    <Col sm={6} lg={4}>
                    <DisplayMedium className="text-center">You Have a New Password!</DisplayMedium>
                     <Image
                      src={ImgURL}
                      fluid
                      width={200}
                     />
                    </Col>
                </Row>
                <Row className="justify-content-center mt-5"> 
                    <Col sm={6} lg={4}>
                    <LinkButton href="/login">Click here to login with your new password.</LinkButton>
                    </Col>
                </Row>
            </Container>
        )
    }

    // decided which form to render
	render(){
		return (
			<div>
                {this.renderSuccessMessage()
                }
            </div>
		);
	}
}