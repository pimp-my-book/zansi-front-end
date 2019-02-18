import React from 'react';
import {MockedProvider} from "react-apollo/test-utils";
import renderer from "react-test-renderer";
import ActivityFeed from "../containers/ActivityFeed";
import {mount,configure} from 'enzyme';
import {ORDER_LIST}from "../graphql/Queries";
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
            mutation: ORDER_LIST
        },
        result: {
            data: {
                order1: {
                    orderId: "34444444343",
                    name: "SBTRK",
                    status: "Cancel Requested",
                    updateDate: "2 days ago"
                }, 
        
                order2:  {
                    orderId: "56454534343",
                    name: "Bon Iver",
                    status: "Cancel Requested",
                    date: "5 days ago"
                },
                order3: {
                    orderId: "56454534343",
                    name: "jessie Ware",
                    status: "Cancel Requested",
                    date: "9 days ago"
                }
            }
        }
    }
];


describe("<ActivityFeed/>", () => {

    it("renders without crashing", () => {
       
    });


    it("renders loading state", () => {

    });


    it("renders error ui when there is an issue", () => {

    });

    it("updates the status of the order", () => {

    });


});