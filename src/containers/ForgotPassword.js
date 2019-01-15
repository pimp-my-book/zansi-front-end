import React, {Component} from "react";
import { Auth } from "aws-amplify";
import PrimaryButton from "../components/PrimaryButton";
import DisplayMedium from "../components/typography/DisplayMedium";
import Textbody from "../components/typography/Textbody";
import LinkButton from "../components/LinkButton";
import {  Form, Col,Container, Row} from "react-bootstrap";


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

    handleSendCodeClick = async event = > {
        event.preventDefault();

        this.setState({isSendingCode: true});

        try {
            await Auth.forgotPassword(this.state.email);
            this.setState({codeSent: true});
        } catch (e) {
            alert(e.message);
            this.setState({emailError: e.message});
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


    ///renderConfirmationForm

    //render success message

    // decided which form to render
	render(){
		return (
			<div>ForgotPassword</div>
		);
	}
}