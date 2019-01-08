import React from "react";
import {Route,Switch} from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Playground from "./containers/Playground";
import Login from "./containers/Login";
import AppliedRoute from "./components/AppliedRoute";
import WithTracker from "./components/WithTracker";

export default ({childProps}) => 
<div>
	<Switch>
		<AppliedRoute exact path="/" component={WithTracker(Home)} props={childProps}/>
        <AppliedRoute  path="/playground-test" component={Playground} props={childProps}/>
		<AppliedRoute  path="/login" component={WithTracker(Login)} props={childProps}/>
		<Route component={NotFound}/>
	</Switch>
</div>;


