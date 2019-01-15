import React from 'react';
import ReactDOM from 'react-dom';
import renderer from "react-test-renderer";
import Signup from '../containers/Signup';
//////////////////////////////////////////////////
/* Comoponent Behaviours
-- User shoudld be able to pust to the Cognito API and recieve a token tp login
: enter personal details =>
: click submit button =>
: validate data from form =>
: redirect to confirmation page =>
: enter confirmation code => 
: validate code => 
: redirect to home page =>
--Post Condition for Success
RE: Sign Up Form
the user should be redirected to the confirmation page
RE: Confirmation Form
User needs to be redirected to a home page
--Post Condition for failure
RE: Sign Up Form
there should be an alert saying whether the passwords do not match
or whether other details failed cognito's validation checks.
RE: Confirmation Form
There should be an alert saying that the code is expired or invalid.
Component Contracts
- it renders a sign up form first, once that is completed it renders a confirmation form
- it recevies a userHasAuthenticated prop and a history prop from
React Router
- it holds state on the following: 
            isLoading
            email
            confirmPassword
            studentNumber
            fullName
            university
            degree
            bursary
            cellNumber
            address
            confirmationCode
            newUser
*/
//////////////////////////////////////////////////


it('renders without crashing', () => {
  renderer.create(
      <Signup/>
  )
});
