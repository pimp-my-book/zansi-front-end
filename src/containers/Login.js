import React, {Component} from "react";
import { Form, Col, Container, Row} from "react-bootstrap";
import { Auth } from "aws-amplify";
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
            error: ""
        };
    }

    validateForm(){
        return this.state.email.length > 0 && this.state.password.length > 0;
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
            await Auth.currentSession()
            .then(data => {
                
                if(data.idToken.payload['cognito:groups']){
					
					
                    this.props.userIsStaff(true);
                    this.props.userHasAuthenticated(true);
					this.props.history.push("/dashboard");
				} else {
                    this.props.userHasAuthenticated(true);
                    this.props.history.push("/order");
					console.log(false);
				}
            })
            
        } catch (e){
            this.setState({error: e.message});
        }
        this.setState({isLoading: false});

    }

    render(){
        return (
            <Container>
                <Row className="justify-content-center mt-5">
                    <Col sm={6} lg={6} >
                    
              <DisplayMedium>Sorry We are no longer providing support for Zansi. So please head over to GOA to place your orders.</DisplayMedium>
          
         <LinkButton 
         className="mt-5"
         sm href="https://gogoa.co.za" >Head to GOA</LinkButton>
        
          
            
                    </Col>
                </Row>
            </Container>
            
         
        );
    }
}