import React from 'react';
import ReactDOM from 'react-dom';
import renderer from "react-test-renderer";
import Signup from '../containers/Signup';

//////////////////////////////////////////////////
/* Comoponent Behaviours


-- User shoudld be able to pust to the Cognito API and recieve a token tp login



--Post Condition for Success



--Post Condition for failure

Component Contracts



*/
//////////////////////////////////////////////////

it('renders without crashing', () => {
  renderer.create(
      <Signup/>
  )
});
