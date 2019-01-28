import React from "react";
import {Route,Switch} from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Playground from "./containers/Playground";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import ForgotPassword from "./containers/ForgotPassword";
import StudentOrderList from "./containers/StudentOrderList";
import AuthenticatedRoute from "./components/routes/AuthenticatedRoute";
import UnathenticatedRoute from "./components/routes/UnathenticatedRoute";
import StaffAuthRoute from "./components/routes/StaffAuthRoute";
import NonStaffRoute from "./components/routes/NonStaffRoute";
import HowItWorks from "./containers/pages/HowItWorks";
import ContactUs from "./containers/pages/ContactUs";
import FAQ from "./containers/pages/FAQ";
import Order from "./containers/Order";
import StaffSignup from "./containers/StaffSignup";
import Dashboard from "./containers/Dashboard";
import OrderInfo from "./containers/OrderInfo";

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
		<UnathenticatedRoute  path="/staff" component={StaffSignup} props={childProps}/>
		
		<NonStaffRoute path="/order" component={Order} props={childProps}>
		<AuthenticatedRoute  path="/order" component={Order} props={childProps}/>
		</NonStaffRoute>

	<NonStaffRoute path="/myorders" component={StudentOrderList} props={childProps}>
		<AuthenticatedRoute  path="/myorders" component={StudentOrderList} props={childProps}/>
		</NonStaffRoute>

		<StaffAuthRoute path="/dashboard" component={Dashboard}  props={childProps}>
		<AuthenticatedRoute  path="/dashboard" component={Dashboard} props={childProps}/>
		</StaffAuthRoute >

		<StaffAuthRoute path="/orderinfo/:orderId/:userId" component={OrderInfo}  props={childProps}>
		<AuthenticatedRoute  path="/orderinfo/:orderId/:userId" component={OrderInfo} props={childProps}/>
		</StaffAuthRoute >
		<Route component={NotFound}/>
	</Switch>
</div>;


