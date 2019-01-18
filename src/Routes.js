import React from "react";
import {Route,Switch} from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Playground from "./containers/Playground";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import ForgotPassword from "./containers/ForgotPassword";
import AuthenticatedRoute from "./components/routes/AuthenticatedRoute";
import UnathenticatedRoute from "./components/routes/UnathenticatedRoute";
import StaffAuthRoute from "./components/routes/StaffAuthRoute";
import HowItWorks from "./containers/pages/HowItWorks";
import ContactUs from "./containers/pages/ContactUs";
import FAQ from "./containers/pages/FAQ";
import Order from "./containers/Order";
import StaffLogin from "./containers/StaffLogin";
import Dashboard from "./containers/Dashboard";

export default ({childProps}) => 
<div>
	<Switch>
		<UnathenticatedRoute exact path="/" component={Home} props={childProps}/>
        <UnathenticatedRoute  path="/playground-test" component={Playground} props={childProps}/>
		<UnathenticatedRoute  path="/login" component={Login} props={childProps}/>
		<UnathenticatedRoute  path="/signup" component={Signup} props={childProps}/>
		<UnathenticatedRoute  path="/how-it-works" component={HowItWorks} props={childProps}/>
		<UnathenticatedRoute  path="/contact-us" component={ContactUs} props={childProps}/>
		<UnathenticatedRoute  path="/faq" component={FAQ} props={childProps}/>
		<UnathenticatedRoute  path="/forgot-password" component={ForgotPassword} props={childProps}/>
		<UnathenticatedRoute  path="/staff" component={StaffLogin} props={childProps}/>
		<AuthenticatedRoute  path="/order" component={Order} props={childProps}/>
		<StaffAuthRoute path="/dashboard" component={Dashboard}  props={childProps}/>
		<AuthenticatedRoute  path="/dashboard" component={Dashboard} props={childProps}/>
		<Route component={NotFound}/>
	</Switch>
</div>;


