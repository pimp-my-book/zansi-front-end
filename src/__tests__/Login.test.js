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
there should be an error message about the form detailing whether the user 
does not exist or incorrect username/password

Component Contracts

* renders a form with two textboxes and a button
*  the button is supposed to set off a spinner after it ism submitting
*  state: password, email & errors
* props: it emits userHasAuthenticated props

after interaction => navbar must have logout in it,

*/
//////////////////////////////////////////////////

it('renders without crashing', () => {
  renderer.create(
      <Login/>
  )
});
