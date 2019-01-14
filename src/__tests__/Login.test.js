import React from 'react';
import ReactDOM from 'react-dom';
import renderer from "react-test-renderer";
import Login from '../containers/Login';


//////////////////////////////////////////////////
/* Comoponent Behaviours


-- User shoudld be able to pust to the Cognito API and recieve a token to login

: Enter password and email address => 
: Click Submit Button =>
: Validate all fields =>
: Initiate loading spiner
: redirect to order page =>
: navbar to have logout. =>


--Post Condition for Success
It should whip up a modal confirminh they were not logged in. 


--Post Condition for failure

Component Contracts



*/
//////////////////////////////////////////////////

it('renders without crashing', () => {
  renderer.create(
      <Login/>
  )
});
