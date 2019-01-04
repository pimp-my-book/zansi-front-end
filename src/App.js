import React, { Component, Fragment } from "react";
import Routes from "./Routes";
import {Auth} from "aws-amplify";
import {Navbar, Nav} from "react-bootstrap";


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
				alert(e);
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
					<Navbar bg="light" expand="lg">
						<Navbar.Brand href="#home">Zansi</Navbar.Brand>
						 <Navbar.Toggle aria-controls="basic-navbar-nav"/>
						{this.state.isAuthenticated
						? <Fragment>
						 
						<Nav.Item
						  onClick={this.handleLogout}
						>Logout
						</Nav.Item>
						</Fragment>

						:<Fragment> 
						 <Nav.Link>
							 More Coming Soon
						 </Nav.Link>
						</Fragment>
					}
					</Navbar>
				<Routes childProps={childProps}/>
				</div>
		);
	}
}

export default App;
  