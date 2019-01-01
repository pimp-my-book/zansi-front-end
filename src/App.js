import React, { Component } from "react";
import styled from "styled-components";
import { Query } from "react-apollo";
import * as query from "./graphql/Queries";
import PrimaryButton from "./components/PrimaryButton";
import "./App.css";

class App extends Component {
  

	render() {

		const Title = styled.h1`
   text-align:center;
   color: pink;
  `;


		return (
			<div className="App">
				<header className="App-header">
					<Title>Hello! Welcome to Zansi! <span role="img" aria-label="book emoji">📚</span></Title>
				  
					<Query
						query={query.HELLO_QUERY}
					>
						{({data, error, loading}) => {
							if (loading) return <p>Loading</p>;
							if (error) return <p>Our API is on a bender ATM, chechk back soon once it is ready.<span role="img" aria-label="Woman Construction Worker emoji">👷‍♀️</span></p>;
							return (
								<p>{data.hello}</p>
							);
						}}
					</Query>
             <PrimaryButton
			 text="hello"
			 />
				</header>
			</div>
		);
	}
}

export default App;
