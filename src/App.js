import React, { Component } from 'react';
import styled from 'styled-components';
import './App.css';

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
        </header>
      </div>
    );
  }
}

export default App;
