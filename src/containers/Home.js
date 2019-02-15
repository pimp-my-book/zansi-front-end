import React from "react";
import styled, {keyframes} from "styled-components";
import {Image, Row, Col, Container} from "react-bootstrap";
import DisplayLarge from "../components/typography/DisplayLarge";
import DisplaySmall from "../components/typography/DisplaySmall";
import Body from "../components/Body";
import OutlineButton from "../components/OutlineButton";

const Home = () => {


	const Header = styled.header`
   background-color: #fbe8e7;
   min-height:100vh;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   font-size: calc(10px + 2vmin);
   color: white;
   `;

	const LinkButton = styled.a`
color: #ff6bd6;
background-color: transparent;
border: 2px solid #ff6bd6;
padding: 10px;
border-radius: 8px;
width: 156px;
font-size: 20px;
`;


	const float = keyframes`
 from {
     transform: translate(0, 0px);
 }

 65% {
     transform: translate(0, 15px);
 }

 to {
     transform: translate(0, -0px);
 }
`;


	const ImageAnimation = styled(Image)`
&&& {
    animation: ${float} 5s infinite ease-in-out;
    margin-bottom: 50px;
}
`;
	const headerURL = "https://s3.amazonaws.com/zansi-static-assest/Illustrations/undraw_book_lover_mkck.svg";
 
	return (
		<Container>
			<Header>
				<Container>
                    
					<Row className="mb-5">
						<Col >
							<DisplayLarge normal>We make getting your textbooks a breeze.</DisplayLarge>
                     
							<DisplaySmall normal>Zansi is a new Pimp My Book service designed to help bursary students to order textbooks.</DisplaySmall>
							<br/>
                    
							<OutlineButton 
						  text="Get Started"
						  to="/signup"
						  
						  border="true"
						   />
						</Col>
						<Col  className=" d-none d-lg-block">
							<ImageAnimation
								src={headerURL}
								fluid
							/>
                   
						</Col>
					</Row>
                    <Row className="mt-5">
                    <Col className="d-lg-none  d-xl-none">
							<ImageAnimation
								src={headerURL}
								fluid
							/>
                   
						</Col>
                    </Row>
				</Container>
			
           
			</Header>

			<Body/>

		</Container>
	)
        
	;
};

export default Home;

