import React, {Component} from "react";
import { Button, Form, Col} from "react-bootstrap";
import { Auth } from "aws-amplify";
import styled from "styled-components";
import SecondaryButton from "../components/SecondaryButton";
import PrimaryButton from "../components/PrimaryButton";
import LinkButton from "../components/LinkButton";


export default class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: "",
            password: ""
        };
    }

    validateForm(){
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }


    handleSubmit = async event => {
        event.preventDefault();

        try {
            await Auth.signIn(this.state.email,this.state.password);
            this.props.userHasAuthenticated(true);
        } catch (e){
            alert(e.message);
        }
    }

    render(){

        const StyledForm = styled.form`
        @media all and (min-width: 480px) {
               
            margin: 0 auto;
            max-width: 320px;
            

        }
        
        @media (max-width:600px){
            margin-left:20px;
            margin: 0 auto;
            max-width: 320px;
        }
        
        `;

        const LoginDiv = styled.div`

         margin-top: 150px;
         

        @media all and (min-width: 480px) {
           
              padding: 60px 0;
           
          
            
              margin: 0 auto;
              max-width: 320px;
           
          }
        `

        const Input = styled(Form.Control)`
         &&& {
             width: 300px;
         }
        `;

        return (
            <LoginDiv>
                
                <StyledForm className="justify-content-center" onSubmit={this.handleSubmit}>
                <Form.Group bsSize="small" controlId="email" >
                <Form.Label>Email</Form.Label>
                <Input
                autoFocus
                required
                type="email"
                value={this.state.email}
                onChange={this.handleChange}
                />
                </Form.Group>
                <Form.Group controlId="password" >
                <Form.Label>Password</Form.Label>
                <Input
                type="password"
                required
               
                value={this.state.password}
                onChange={this.handleChange}
                />
                </Form.Group>
                <Form.Group>
                <LinkButton sm href="/forgot-password" >
                Forgot Your Password?
                </LinkButton>
                </Form.Group>
                
          <PrimaryButton
             text="Login"
             sm
             disabled={!this.validateForm()}
             className="mr-3"
             type="submit"
          /> 
          
         <LinkButton sm href="/signup" >Don't Have An Account?</LinkButton>
        
          
                </StyledForm>
            </LoginDiv>
        );
    }
}