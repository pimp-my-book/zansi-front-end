import React from "react";
import { Query } from "react-apollo";
import * as query from "../graphql/Queries";
import styled from "styled-components";
import {Image, Row, Col, Container, Button} from "react-bootstrap";
import DisplayLarge from "../components/typography/DisplayLarge";
import DisplaySmall from "../components/typography/DisplaySmall";
import Body from "../components/Body";
import PrimaryButton from "../components/PrimaryButton";

const Home = () => {

    const Title = styled.h1`
    text-align:center;
    color: var(--bubblegum);
    `;


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
color: var(--rose-pink);
background-color: transparent;
border: 2px solid var(--rose-pink);
padding: 10px;
border-radius: 8px;
width: 156px;
font-size: 20px;
`;

   const headerURL = "https://s3.amazonaws.com/zansi-static-assest/Illustrations/undraw_book_lover_mkck.svg";
 
	return (
        <Container>
		<Header>
            <Container>
                <Row>
                   <Col classname="">
                     <DisplayLarge normal>We make getting your textbooks a breeze.</DisplayLarge>
                     <DisplaySmall normal>Zansi is a new Pimp My Book Service designed to get you equiped with your prescribed textbooks for your academic year.</DisplaySmall>
                     <LinkButton  
            href="/order">
            Order Now
            </LinkButton>
                    </Col>
                    <Col  className=" d-none d-lg-block">
                    <Image
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

/*
 <Title>Hello! Welcome to Zansi! <span role="img" aria-label="book emoji">📚</span></Title>
				  
                  <Query
                      query={query.HELLO_QUERY}
                  >
                      {({data, error, loading}) => {
                          if (loading) return <p>Loading</p>;
                          if (error) return <p>Our API is on a bender ATM, check back soon once it is ready.<span role="img" aria-label="Woman Construction Worker emoji">👷‍♀️</span></p>;
                          return (
                              <p>{data.hello}</p>
                          );
                      }}
                  </Query>
*/