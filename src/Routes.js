import React from "react";
import {Route,BrowserRouter as Router,Switch} from "react-router-dom";
import Home from "./containers/Home";

export default () => 
<Router >
<Route exact path="/" component={Home}/>
</Router>;


