import styled from "styled-components";

/*
behaviours

 --> No border
 --> Have an href
 --> Set Primary Colours

*/
const LinkButton = styled.a`
color: #ff6bd6;
background-color: transparent;
border: ${props => props.border ? "2px solid #ff6bd6" : "none" };
border-bottom: 2px solid var(--rose-pink);
line-height: 0.85;
padding: 10px;
border-radius: 0px;
width:  ${props => props.sm ? '100px' : '150px'};
font-family: 'Poppins', sans-serif;
font-size: 15px;
padding: 2px;



&:hover, &:focus {
    border-bottom:5px solid var(--rose-pink);
    text-decoration: none;
    color:#ff6bd6;

}


@media (max-width:600px){
    width: 70px;
    font-size: 11px;
}


`;

export default LinkButton;