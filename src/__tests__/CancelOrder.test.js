import React from 'react';
import {MockedProvider} from "react-apollo/test-utils";
import renderer from "react-test-renderer";
import CancelOrder from "../containers/CancelOrder";
import {CANCEL_ORDER} from "../graphql/Mutations";
import {mount,configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {wrap} from 'module';
configure({adapter: new Adapter()});


/////////////////////////////////////////////////
/* Comoponent Behaviours
-- A student should be able to update the status of their order to
cancel requested. 

:Click trash icon =>
:modal opens =>
:Select dropdown option =>
:Fire submit button =>


--Post Condition for Success
: An info alert should pop up indicating the op was
succesfull
: the status badge should change to cancel requested


--Post Condition for failure
: An info alert should pop up indicating the op was
unsuccesfull
: the status badge should have the current status of 
the order.


Component Contracts
* state: {show, orderStatus}
* opens a modal when "show:true"
* recieves params for the orderId and UserID from the URL
*/

//////////////////////////////////////////////////


const mocks = [
    {
        request: {
            mutation: CANCEL_ORDER
        },
        result: {
            data: {
                cancelOrder: {

                }
            }
        }
    }
];


describe("<CancelOrder/>", () => {

    it("renders without crashing", () => {

    });


    it("renders loading state", () => {

    });


    it("renders error ui when there is an issue", () => {

    });

    it("updates the status of the order", () => {

    });


});