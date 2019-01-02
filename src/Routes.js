import React from "react";
import {Route,BrowserRouter as Router,Switch} from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";

export default () => 
	<Router >
		<Route exact path="/" component={Home}/>
		<Route component={NotFound}/>
	</Router>;


