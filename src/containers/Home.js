import React from "react";
import { Query } from "react-apollo";
import * as query from "../graphql/Queries";
import styled from "styled-components";

const Home = () => {

    const Title = styled.h1`
    text-align:center;
    color: pink;
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
   `
 
	return (
		<Header>
			
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
        </Header>
        
    )
        
        ;
};

export default Home;