import React from "react";
import { Alert } from "react-bootstrap";

const Info = 
({variant,
	text}) => {
	return(
		<Alert dismissible variant={variant}>
			{text}
		</Alert>

	);
};

export default Info;