import React from 'react';
import ReactDOM from 'react-dom';
import renderer from "react-test-renderer";
import {MockedProvider} from "react-apollo/test-utils";
import {PLACE_ORDER_MUTATION} from "../graphql/Mutations";
import Order from '../containers/Order';
import {mount,configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {wrap} from 'module';
configure({adapter: new Adapter()});

////////////////////////////////////////////////////
/* Component behaviours
 - User should call the place order mututaion
 : Enter order details => 
 : Click Submit button => 
 : Validate inputs =>
 : Open modal for success =>
 : Redirect to place order page 
 - Post Conditon for success: 
 There should be a alert indicating the orderId and name of order
Then be redirected to place order page:
 -Post Condition for failure:
 There should be an alert saying that there was a failure 
 in placing the order
Components Contracts:
- Waht does it render ?
first an orderForm then a ConfirmOrderForm 
- What props does it recieve?
It uses a mutation component from Apollo to interact with the API
it has an error, loading and data props and an order props to trigger the mutaion. 
- What state does it hold?
             isLoading
            show
            title
            ISBN
            author
            edition
            orderID
            newOrder
- what does it do when a user has interacted with it? 
Once the order form has been submitted it should render a orderConfirmationForm. 
--Look for if states & ternary operators.
*/
/////////////////////////////////////////////////////

const mocks = [
    {

    }
];

describe("<Order/>", () => {


    it("renders without crashing", () => {

    });

    it("renders loading state", () => {

    });

    it("renders error ui", () => {

    });

    it("able to place an order", () => {

    });


    it("not able to place an order", () => {

    });
}); 