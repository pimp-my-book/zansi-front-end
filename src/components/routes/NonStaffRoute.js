import React from "react";
import {Route, Redirect} from "react-router-dom";

export default ({component: C,props: cProps, ...rest}) => 
	<Route
		{...rest}
		render={props => 
			cProps.isStaff 
					? <Redirect
                    to={`/dashboard?redirect=${props.location.pathname}${props.location.search}`}
                /> 
                : <C {...props} {...cProps}/>

                
		}
	/>;