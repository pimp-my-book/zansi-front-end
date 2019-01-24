import React from "react";
import ReactDOM from "react-dom";
import Amplify, {Auth} from "aws-amplify";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import config from "./config";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from "apollo-cache-inmemory";
import {createGlobalStyle} from "styled-components";
import {BrowserRouter as Router} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

/*  A few things to note:

The react app is hosted on Netlify.

The graphQL API is hosted on AWS via Lambda.

Zansi's styleguide is implemented with the use of Bootstrap4 and Styled-Components



*/


//Connect to Amplify
Amplify.configure({
	Auth: {
		mandatorySignIn: true,
		region: config.cognito.REGION,
		userPoolId: config.cognito.USER_POOL_ID,
		identityPoolId: config.cognito.IDENTITY_POOL_ID,
		userPoolWebClientId: config.cognito.APP_CLIENT_ID
	},
	API: {
		endpoints: [ 
			{
				name: "zansi",
				endpoint: config.apiGateway.URL,
				region: config.apiGateway.REGION
			},
		]
	}
});
	

//Identyifying the different enviromental stages
const stage = process.env.REACT_APP_STAGE === "prod";

//Providing the user access to the api
const authLink = setContext(async (_, {headers}) => {
	
	const token = await Auth.currentSession();
		return {
			headers: {
				...headers,
				Authorization: token ? `Bearer ${token.idToken.jwtToken}` : null
			  
			}
		}
	});


//Connecting the GraphQL API to REACT-APOLLO  stage ? process.env.REACT_APP_API_ENDPOINT_PROD  : process.env.REACT_APP_API_ENDPOINT_DEV
//'http://localhost:4000/graphql' 
const httpLink = createHttpLink({
	uri: stage ? process.env.REACT_APP_API_ENDPOINT_PROD  : process.env.REACT_APP_API_ENDPOINT_DEV 

});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
	clientState: {
		defaults: {},
		resolvers: {}
	},
	onError: ({networkError, graphQLErrors}) => {
		console.log('graphQLErrors', graphQLErrors)
        console.log('networkError', networkError)

	}
});





//Global APP styles

const GlobalStyle = createGlobalStyle`



:root{
	
	--rose-pink: #ff6bd6;
	--linen: #fbe8e7;
	--space-cadet: #1b335f;
	--folly: #2b2024;
	--rasin-black: #2b2024; 

	--wageningen-green: #3BC14A;
	--medium-sky-blue: #64E9EE;
	--maize: #feef6d;
	--papaya-whip: #ffecd3;

	--sea-shell: #fcf5ee;
	--white: #ffffff;
	--bubblegum: #ffc4d0;
	--pale-pink:#f7ddde;

}


@import url('https://fonts.googleapis.com/css?family=Poppins|Paytone+One');
	body {

		margin: 0 0 100px;
		font-family: 'Poppins', sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		background-color: #fbe8e7;
	
		/* Disable auto-enlargement of small text in Safari */
		text-size-adjust: 100%;
	  
		/* Enable kerning and optional ligatures */
		text-rendering: optimizeLegibility;
	  }
	
	  h1,h2,h4,h5{
		  font-family: 'Paytone One', sans-serif;
	  }

	
	 
	


html {
	position: relative;
	min-height: 100%;
}


`;






ReactDOM.render(
	<Router>
		<ApolloProvider client={client}>
			<GlobalStyle />
			<App />
		</ApolloProvider>
	</Router>, 

	document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
