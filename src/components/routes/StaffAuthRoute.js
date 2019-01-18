import React from "react";
import {Route, Redirect} from "react-router-dom";

export default ({component: C,props: cProps, ...rest}) => 
	<Route
		{...rest}
		render={props => 
			cProps.isStaff ? <C {...props} {...cProps}/>
			: <Redirect
to={`/login?redirect=${props.location.pathname}${props.location.search}`}
/> 
		
		}
	/>;

/*
cProps.isAuthenticated
				? (cProps.isStaff 
					? <C {...props} {...cProps}/>
					: <Redirect
					to={`/login?redirect=${props.location.pathname}${props.location.search}`}
				/> ) : <Redirect
					to={`/login?redirect=${props.location.pathname}${props.location.search}`}
				/>
	*/

/*
	cProps.isStaff ? <C {...props} {...cProps}/>
						: <Redirect
			to={`/login?redirect=${props.location.pathname}${props.location.search}`}
		/> 
				


	*/