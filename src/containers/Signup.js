import React, {Component} from "react";
import { Auth } from "aws-amplify";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import DisplayMedium from "../components/typography/DisplayMedium";
import Textbody from "../components/typography/Textbody";
import LinkButton from "../components/LinkButton";
import Info from "../components/Info";
import { Form, Col,Container, Row} from "react-bootstrap";
import {Univeristies,Bursaries} from "../constants";

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
            newUser: null,
            error: "",
            resend: false
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
            this.props.history.push("/order");
        } catch (e){
            
            this.setState({isLoading: false,error: e.message});
        }

    }

    resendCode = async event => {
        try{
         await Auth.resendSignUp(this.state.email);
         this.setState({resend: true});
        } catch(e){
            this.setState({error: e.message});
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

                        {this.state.resend === true && 
                     <Info 
                     text="We have resent the code!"
                     variant="info"
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
                             <Form.Label classname="text-center"><Textbody>Confirmation Code</Textbody></Form.Label>
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


    renderForm(){
        
        return(
            <div>

                <Container>
                    <Row>
                       <Col className="justify-content-center mt-5">
                       <DisplayMedium>Sorry We are no longer providing support for Zansi. So please head over to GOA to place your orders.</DisplayMedium>
          
         <LinkButton 
         className="mt-5"
         sm href="https://gogoa.co.za" >Head to GOA</LinkButton>
        
                
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