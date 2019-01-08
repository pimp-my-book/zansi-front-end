import React, {Component} from "react";
import { Button, Form} from "react-bootstrap";
import { Auth } from "aws-amplify";


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
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                <Form.Group controlId="email" >
                <Form.Label>Email</Form.Label>
                <Form.Control
                autoFocus
                type="email"
                value={this.state.email}
                onChange={this.handleChange}
                />
                </Form.Group>
                <Form.Group controlId="password" >
                <Form.Label>Password</Form.Label>
                <Form.Control
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
                />
                </Form.Group>
                <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
                </form>
            </div>
        );
    }
}