import React, {Component} from "react";
import { Auth } from "aws-amplify";
import PrimaryButton from "../components/PrimaryButton";
import DisplayMedium from "../components/typography/DisplayMedium";
import Textbody from "../components/typography/Textbody";
import LinkButton from "../components/LinkButton";
import Info from "../components/Info";
import {  Form, Col,Container, Row} from "react-bootstrap";
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
            error: ""
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
                    {this.state.error && 
                       <Info 
                       text={this.state.error}
                       variant="danger"
                       />
                       }

                    <Row className="justify-content-center">
                        <Col sm={1} lg={10}>

                        <Form onSubmit={this.handleSubmit}>
                    <Form.Row lg={2}>
                        <Form.Group as={Col}>
                         <Form.Label><Textbody>Full Name</Textbody></Form.Label>
                         <Form.Control 
                         required
                          value={this.state.fullName}
                         placeholder="eg: Steve Biko"
                         onChange={this.handleChange('fullName')}
                        
                         />
                        </Form.Group>

                        <Form.Group as={Col}>
                         <Form.Label><Textbody>Email</Textbody></Form.Label>
                         <Form.Control 
                         required
                         type="email" 
                         placeholder="email@example.com"
                         value={this.state.email}
                         onChange={this.handleChange('email')}
                         />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                         <Form.Label><Textbody>Student Number</Textbody></Form.Label>
                         <Form.Control 
                         type="text"
                         required 
                         placeholder="123456789"
                         value={this.state.studentNumber}
                         onChange={this.handleChange('studentNumber')}
                         />
                        </Form.Group>

                        <Form.Group as={Col}>
                         <Form.Label><Textbody>University</Textbody></Form.Label>
                         <Form.Control 
                         as="select"
                         required
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
                         <Form.Label><Textbody>Bursary</Textbody></Form.Label>
                         <Form.Control 
                         as="select"
                         required
                         value={this.state.bursary}
                         onChange={this.handleChange('bursary')}
                         >{
                            Bursaries.map(
                                bursaryOp => (
                                    <option
                                    key={bursaryOp}
                                    >
                                        {bursaryOp}
                                    </option>
                                )
                            )}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col}>
                         <Form.Label><Textbody>Degree</Textbody></Form.Label>
                         <Form.Control 
                         type="text" 
                         required
                         placeholder="eg: BSC Engineering"
                         value={this.state.degree}
                         onChange={this.handleChange('degree')}
                         />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                         <Form.Label><Textbody>Delivery Address</Textbody></Form.Label>
                         <Form.Control 
                         as="textarea" 
                         required
                         placeholder="eg: 12 Imaginary Road, Suburb, City, Province,Zip Code"
                         value={this.state.address}
                         onChange={this.handleChange('address')}
                         />
                        </Form.Group>

                        <Form.Group as={Col}>
                         <Form.Label><Textbody>Phone Number</Textbody></Form.Label>
                         <Form.Control  
                         type="number" 
                         required
                         placeholder="0745896313"
                         value={this.state.cellNumber}
                         onChange={this.handleChange('cellNumber')}

                         />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                         <Form.Label><Textbody>Password</Textbody></Form.Label>
                         <Form.Control 
                         type="password" 
                         required
                         placeholder="Something Secret"
                         onChange={this.handleChange('password')}
                         value={this.state.password}
                         />
                        </Form.Group>

                        <Form.Group as={Col}>
                         <Form.Label><Textbody>Confirm Password</Textbody></Form.Label>
                         <Form.Control  
                         type="password" 
                         required
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