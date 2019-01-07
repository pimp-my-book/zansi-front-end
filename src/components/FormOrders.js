import React from "react";
import DisplayLarge from "./typography/DisplayLarge";
import Textbody from "./typography/Textbody";
import PrimaryButton from "../components/PrimaryButton";
import { Link } from "react-router-dom";
import styled from "styled-components";


const LinkButton = styled.a`
color: var(--linen);
background-color: var(--rose-pink);
border: 2px solid var(--rose-pink);
padding: 10px;
border-radius: 8px;
width: 156px;
font-size: 20px;
`;

const FormOrders = () =>
{
    return(
        <div>
            <div className="text-center">
            <DisplayLarge normal> Place Orders</DisplayLarge>
            </div>
            <div className="text-center p-4">
                <Textbody>
                To place an order all you have to do is click on the link below and it will take you to a Google Form. 
                In the form you can go ahead and place your order. 
                </Textbody>
            </div>
            <div className="text-center">
            <LinkButton  
            href="https://docs.google.com/forms/d/e/1FAIpQLSdKL281Oic4JbxoFCi0q4E_U_X0XtJpIPhYkV_vV4vNi3wVjA/viewform?usp=sf_link">
            Go to Google Form
            </LinkButton>
            
             
            </div>
        </div>
        )
}
;

export default FormOrders;