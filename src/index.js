import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Amplify from "aws-amplify";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import config from "./config";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import "bootstrap/dist/css/bootstrap.min.css";


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
    
const stage = process.env.REACT_APP_STAGE === 'prod';


const httpLink = createHttpLink({
	uri: stage ? process.env.REACT_APP_API_ENDPOINT_DEV : "http://localhost:3000/graphql"
});

const client = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache()
});



ReactDOM.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>, 

	document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
