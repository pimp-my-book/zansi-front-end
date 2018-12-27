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
					<Title>Hello! Welcome to Zansi! <span role="img" aria-label="book emoji">📚</span></Title>
				  <Button>Testing Bootstrap</Button>
           <Query
           query={query.HELLO_QUERY}
           >
           {({data, error, loading}) => {
             if (loading) return <p>Loading</p>;
             if (error) return <p>error</p>;
             return (
               <p>{data.hello}</p>
             )
           }}
           </Query>
          <NewButton>Testing styled components with Bootstrap</NewButton>
        </header>
			</div>
		);
	}
}

export default App;
