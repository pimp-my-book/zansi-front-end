import React, { Component } from "react";
import styled from "styled-components";
import { Button } from 'react-bootstrap';
import { Query } from 'react-apollo';
import * as query from './graphql/Queries';

import "./App.css";

class App extends Component {
  

	render() {

		const Title = styled.h1`
   text-align:center;
   color: pink;
  `;

  const NewButton = styled(Button)`
   padding: 20px;
   color: pink;
   background-color: red;
   border: none;

   :hover {
    background-color: pink;
   }
  `;





		return (
			<div className="App">
				<header className="App-header">
        <div className="App-logo"><span role="img"   aria-label="book emoji">📚</span></div>
					<Title>Hello! Welcome to Zansi!</Title>
           <Query
           query={query.HELLO_QUERY}
           >
           {({data, error, loading}) => {
             if (loading) return <p>Loading</p>;
             if (error) return <p>Our API is on a bender ATM, chechk back soon once it is ready.<span role="img" aria-label="Woman Construction Worker emoji">👷‍♀️</span></p>;
             return (
               <p>{data.hello}</p>
             )
           }}
           </Query>
          
        </header>
			</div>
		);
	}
}

export default App;
