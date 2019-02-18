import React, { Component, Fragment } from "react";
import Routes from "./Routes";
import {Auth} from "aws-amplify";
import { withRouter} from "react-router-dom";
import { Navbar,Nav} from "react-bootstrap";
import Navigation from "./components/Navigation";
import DisplayXlarge from "./components/typography/DisplayXlarge";
import DisplaySmall from "./components/typography/DisplaySmall";
import Footer from "./components/Footer";
import OutlineButton from "./components/OutlineButton";
import styled from "styled-components";
import NavToggler from "./components/NavToggler";

class App extends Component {
	constructor(props){
		super(props);

		this.state = {
			isAuthenticated: false,
			isAuthenticating: true,
			isStaff: false
			
		};
	}

	userHasAuthenticated = authenticated => {
		this.setState({isAuthenticated:authenticated })
	}

	userIsStaff = verified => {
		this.setState({isStaff: verified});
	}

	handleLogout = async event => {
		await Auth.signOut();

	  this.userHasAuthenticated(false);
	  this.userIsStaff(false);
      this.props.history.push("/login");

	}

	async componentDidMount(){
		try {
			 await Auth.currentSession()
			 .then(data =>  {
				this.userHasAuthenticated(true);
				if(data.idToken.payload['cognito:groups']){
					console.log('true');
					
					this.userIsStaff(true);
					
				} else {
					console.log(false);
				}
			})
		
			}catch (e){
			if (e !== 'No Current User!') {
				console.log(e);
			}
		}

		this.setState({isAuthenticating: false});
	}

	
	render() {
		const childProps = {
			isAuthenticated: this.state.isAuthenticated,
			userHasAuthenticated: this.userHasAuthenticated,
			userIsStaff: this.userIsStaff,
			isStaff: this.state.isStaff
		};
		const LinkA = styled.a`
            text-decoration: none;
            color: #1b335f;
                 `;
		return (	
			!this.state.isAuthenticating &&	
			    <div>	
					
					<Navigation>
					
						<Navbar.Brand href="/"><DisplayXlarge normal>Zansi</DisplayXlarge></Navbar.Brand>
			     
						 <NavToggler>Menu</NavToggler>
						 <Navbar.Collapse >
						<Nav className="ml-auto">
						 {this.state.isAuthenticated
						? <Fragment>
						 


                          
						
						  {this.state.isStaff &&
							<Nav.Item className="mt-4 mr-3">
							<DisplaySmall normal>
							<LinkA
							href="/dashboard"
							>
							Dashboard
							</LinkA>
							   
							   </DisplaySmall>
							   </Nav.Item>
						}
						
						{this.state.isStaff &&
							<Nav.Item className="mt-4 mr-3">
							<DisplaySmall normal>
							<LinkA
							href="/activity"
							>
							Activity Feed
							</LinkA>
							   
							   </DisplaySmall>
							   </Nav.Item>
						}
						

						  {!this.state.isStaff &&
						  <Fragment>
							<Nav.Item className="mt-4 mr-3">
							<DisplaySmall normal>
							<LinkA
							href="/order"
							>
							Place An Order
							</LinkA>
							   
							   </DisplaySmall>
							   </Nav.Item>

							   <Nav.Item className="mt-4 mr-3">
							<DisplaySmall normal>
							<LinkA
							href="/myorders"
							>
							My Orders
							</LinkA>
							   
							   </DisplaySmall>
							   </Nav.Item>
							   </Fragment>
						}
						
						
						 
						<Nav.Item className="mt-4"
						  onClick={this.handleLogout}
						>
						<DisplaySmall normal pointer>
						Logout
						</DisplaySmall>
						</Nav.Item>
						
						</Fragment>
						

						: 
						<Fragment> 
                            <Nav.Item className="mt-4 mr-4">
							<DisplaySmall normal>
							<LinkA
							href="/how-it-works"
							>
							How It Works
							</LinkA>
							</DisplaySmall>
							
						 </Nav.Item>
						 <Nav.Item className="mt-4 mr-4">
							<DisplaySmall normal>
							<LinkA
							href="/contact-us"
							>
							Contact Us
							</LinkA>
							</DisplaySmall>
							
						 </Nav.Item>
						 <Nav.Item className="mt-4 mr-4">
							<DisplaySmall normal>
							<LinkA
							href="/FAQ"
							>
							FAQ
							</LinkA>
							</DisplaySmall>
							
						 </Nav.Item>

						 <Nav.Item className="mt-4 mr-4">
				             <DisplaySmall normal>
							<LinkA
							href="/signup"
							>
							Sign up
							</LinkA>
							</DisplaySmall>
						   </Nav.Item>
						 
						 
						  <Nav.Item className="mt-3 mr-4">
						  <OutlineButton 
						  text="Login"
						  to="/login"
						  small="true"
						  border="true"
						  fill="true"
						   />
						 </Nav.Item>
                            
                   
						  
						</Fragment>
						
						
					}
					</Nav>
					</Navbar.Collapse >
					</Navigation>  
					
					
				<Routes childProps={childProps}/>
				<Footer/> 
				</div>
		);
	}
}

export default withRouter(App);