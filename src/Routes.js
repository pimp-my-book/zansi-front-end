import React from "react";
import {Route,BrowserRouter as Router,Switch} from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Playground from "./containers/Playground";
import Login from "./containers/Login";

export default () => 
<div>
	<Switch>
		<Route exact path="/" component={Home}/>
        <Route  path="/playground-test" component={Playground}/>
		<Route  path="/login" component={Login}/>

		<Route component={NotFound}/>
	</Switch>
</div>;


