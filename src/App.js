import React, { Component, Fragment } from "react";
import Routes from "./Routes";
import {Auth} from "aws-amplify";


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
					<div>
						{this.state.isAuthenticated
						? <Fragment>
						
						<button
						  onClick={this.handleLogout}
						>Logout</button>
						</Fragment>

						:<Fragment> 
						<p>Home</p>
						</Fragment>
					}
					</div>
				<Routes childProps={childProps}/>
				</div>
		);
	}
}

export default App;
  