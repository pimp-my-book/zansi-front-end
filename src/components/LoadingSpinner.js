import React from 'react';
import styled, {keyframes} from "styled-components";
import * as Icon from 'react-feather';


const rotate = keyframes`
  from {
	  transform: rotate(0deg);
  }
  to {
	  transform: rotate(360deg);
  }
`;
const SpinnerStyles = styled.span`
display: inline-block;  
 animation: ${rotate} 2s  infinite linear;
`;






const LoadingSpinner = () => {
    return(
        <SpinnerStyles>
        <Icon.RefreshCw/>
        </SpinnerStyles>
    )
}

export default LoadingSpinner;