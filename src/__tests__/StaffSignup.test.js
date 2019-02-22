import React from 'react';
import ReactDOM from 'react-dom';
import renderer from "react-test-renderer";
import StaffSignup from '../containers/StaffSignup';
import {mount,configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {wrap} from 'module';
configure({adapter: new Adapter()});


/////////////////////////////////////////////////
/* Comoponent Behaviours
-- User shoudld be able to pust to the Cognito API and recieve a token to login
: 

--Post Condition for Success

--Post Condition for failure


Component Contracts

*/
//////////////////////////////////////////////////
describe('<StaffSignup/>', ()=> {

  
    it('renders without crashing', () => {
      renderer.create(
          <StaffSignup/>
      )
    });


    
  it("renders loading state", () => {

});

it("renders error ui", () => {

});

it("able to signup", () => {

});


it("not able to signup", () => {

});
    
    
    });
    