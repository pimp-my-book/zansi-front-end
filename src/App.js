import React, { Component, Fragment } from "react";
import Routes from "./Routes";
import {Auth} from "aws-amplify";
import { Navbar,Nav,Container} from "react-bootstrap";
import Navigation from "./components/Navigation";

import DisplayXlarge from "./components/typography/DisplayXlarge";
import DisplaySmall from "./components/typography/DisplaySmall";
import Footer from "./components/Footer";

 import NavToggler from "./components/NavToggler";
class App extends Component {
	constructor(props){
		super(props);

		this.state = {
			isAuthenticated: false,
			isAuthenticating: true
			
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
			 await Auth.currentSession();
			this.userHasAuthenticated(true);
		}
		catch (e){
			if (e !== 'No Current User') {
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
		return (	
			!this.state.isAuthenticating &&	
			    <div>	
					
					<Navigation>
					
						<Navbar.Brand href="#home"><DisplayXlarge normal>Zansi</DisplayXlarge></Navbar.Brand>
			
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
							<DisplaySmall normal>How It Works</DisplaySmall>
						 </Nav.Item>
						 <Nav.Item className="mt-4 mr-4">
							<DisplaySmall normal>Temporay Service</DisplaySmall>
						 </Nav.Item>
						 <Nav.Item className="mt-4 mr-4">
							<DisplaySmall normal>FAQ</DisplaySmall>


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
  