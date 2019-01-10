import React from "react";
import {Route,Switch} from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Playground from "./containers/Playground";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import AppliedRoute from "./components/AppliedRoute";
import HowItWorks from "./containers/pages/HowItWorks";
import ContactUs from "./containers/pages/ContactUs";
import FAQ from "./containers/pages/FAQ";

export default ({childProps}) => 
<div>
	<Switch>
		<AppliedRoute exact path="/" component={Home} props={childProps}/>
        <AppliedRoute  path="/playground-test" component={Playground} props={childProps}/>
		<AppliedRoute  path="/login" component={Login} props={childProps}/>
		<AppliedRoute  path="/signup" component={Signup} props={childProps}/>
		<AppliedRoute  path="/how-it-works" component={HowItWorks} props={childProps}/>
		<AppliedRoute  path="/contact-us" component={ContactUs} props={childProps}/>
		<AppliedRoute  path="/faq" component={FAQ} props={childProps}/>

		<Route component={NotFound}/>
	</Switch>
</div>;


