import React from "react";
import ReactDOM from "react-dom";
import Amplify from "aws-amplify";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import config from "./config";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import {createGlobalStyle} from 'styled-components';
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
const stage = process.env.REACT_APP_STAGE === 'prod';




//Connecting the GraphQL API to REACT-APOLLO
const httpLink = createHttpLink({
	uri: stage ? process.env.REACT_APP_API_ENDPOINT_DEV : "http://localhost:3000/graphql"
});

const client = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache()
});



//Global APP styles

const GlobalStyle = createGlobalStyle`


:root {
	--rose-pink: #ff6bd6;
	--linen: #fbe8e7;
	--space-cadet: #1b335f;
	--folly: #2b2024;
	--rasin-black: #fd0054; 

	--wageningen-green: #3BC14A;
	--medium-sky-blue: #64E9EE;
	--maize: #feef6d;
	--papaya-whip: #ffecd3;
}
 
 


@import url('https://fonts.googleapis.com/css?family=Poppins');
   body {

	margin: 0;
	padding: 0;
	font-family: 'Poppins', sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;


	/* Disable auto-enlargement of small text in Safari */
	text-size-adjust: 100%;
  
	/* Enable kerning and optional ligatures */
	text-rendering: optimizeLegibility;
  }

  h1,h2,h3,h4,h5{
	  font-family: inherit;
  }
 




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
