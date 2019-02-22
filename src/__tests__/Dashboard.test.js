import React from 'react';
import ReactDOM from 'react-dom';
import renderer from "react-test-renderer";
import Dashboard from '../containers/Dashboard';
import {mount,configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {wrap} from 'module';
configure({adapter: new Adapter()});
/////////////////////////////////////////////////
/* Comoponent Behaviours
-- User shoudld be able to pust to the Cognito API and recieve a token to login
: Land on page =>
: View all orders =>
: Pagination should be working =>
: Should be able to download all orders to speadsheet
: Search Orders =>
: Total number of orders =>
: Can View Individual orders =>

--Post Condition for Success
$ Table renders orders
$ Orders can be downloaded to csv
$ 

--Post Condition for failure
# Table does not render orders
# Orders can't be downloaded to csv

Component Contracts
[ ] State = {loading, currentPage, ordersPerPage, orders}
[ ]  Renders two loadinging spinenrs
[ ] Has pagination 
[ ] Badges have to render a variant based on order status

*/
//////////////////////////////////////////////////
describe('<Dashboard/>', ()=> {

  
    it('renders without crashing', () => {
      renderer.create(
          <Dashboard/>
      )
    });
    
    
    });
    