import React, { Component } from "react";
import styled from "styled-components";
import { Button } from 'react-bootstrap';
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
          <NewButton>Testing styled components with Bootstrap</NewButton>
        </header>
			</div>
		);
	}
}

export default App;
