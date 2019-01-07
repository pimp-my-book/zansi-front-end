import React from 'react';
import styled from "styled-components";
import {Navbar} from "react-bootstrap";


const NavbarStyles = styled(Navbar)`

&&&{
    background-color: #fbe8e7;
    border-top: #ffc4d0 8px solid;
}


`;

const Navigation = ({
   expand,
   ...props
}) => {
    return(
        <NavbarStyles
        expand="lg"
        {...props}
        ></NavbarStyles>
       
        

      
    );
};


export default Navigation;