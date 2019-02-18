import React from 'react';
import {MockedProvider} from "react-apollo/test-utils";
import renderer from "react-test-renderer";
import ActivityFeed from "../containers/ActivityFeed";
import {mount,configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {wrap} from 'module';
//import {CANCEL_ORDER} from "../graphql/Mutations";

configure({adapter: new Adapter()});

/////////////////////////////////////////////////
/* Comoponent Behaviours
The staff member just views all orders that have
been requested to cancel

--Post Condition for Success
The orders should render, only those that have status of cancel requested


--Post Condition for failure
No orders are able to be displayed for some reason.

Component Contracts
* no state
* 
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