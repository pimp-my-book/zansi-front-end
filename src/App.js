import React, { Component, Fragment } from "react";
import Routes from "./Routes";
import {Auth} from "aws-amplify";
//import {Link} from "react-router-dom";
import { Navbar,Nav} from "react-bootstrap";
import Navigation from "./components/Navigation";
import DisplayXlarge from "./components/typography/DisplayXlarge";
import DisplaySmall from "./components/typography/DisplaySmall";
import Footer from "./components/Footer";
import styled from "styled-components";
import NavToggler from "./components/NavToggler";

class App extends Component {
	constructor(props){
		super(props);

		this.state = {
			isAuthenticated: false,
			isAuthenticating: true,
			
		};
	}

	userHasAuthenticated = authenticated => {
		this.setState({isAuthenticated:authenticated })
	}

	handleLogout = async event => {
		await Auth.signOut();

      this.userHasAuthenticated(false);
	}

	async componentDidMount(){
		try {
			 await Auth.currentSession()
			 .then(data =>  {
				if(data.idToken.payload['cognito:groups']){
					console.log('true');
					this.userHasAuthenticated(true);
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
			userHasAuthenticated: this.userHasAuthenticated
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
						 
						<Nav.Item className="mt-4"
						  onClick={this.handleLogout}
						>Logout
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
							href="https://docs.google.com/forms/d/e/1FAIpQLSdKL281Oic4JbxoFCi0q4E_U_X0XtJpIPhYkV_vV4vNi3wVjA/viewform?usp=sf_link"
							>
							Order Now
							</LinkA>
							</DisplaySmall>
							
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

export default App;
  
