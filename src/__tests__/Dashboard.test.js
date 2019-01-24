import React from 'react';
import ReactDOM from 'react-dom';
import renderer from "react-test-renderer";
import Dashboard from '../containers/Dashboard';

/////////////////////////////////////////////////
/* Comoponent Behaviours
-- User shoudld be able to pust to the Cognito API and recieve a token to login
: 

--Post Condition for Success

--Post Condition for failure


Component Contracts

*/
//////////////////////////////////////////////////
describe('<Dashboard/>', ()=> {

  
    it('renders without crashing', () => {
      renderer.create(
          <Dashboard/>
      )
    });
    
    
    });
    