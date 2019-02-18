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


--Post Condition for Success


--Post Condition for failure


Component Contracts
*r
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