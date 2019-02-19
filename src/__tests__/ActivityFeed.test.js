import React from "react";
import {MockedProvider} from "react-apollo/test-utils";
import renderer from "react-test-renderer";
import ActivityFeed from "../containers/ActivityFeed";
import {mount,configure, shallow} from "enzyme";
import LoadingSpinner from "../components/LoadingSpinner";
import {ORDER_LIST}from "../graphql/Queries";
import Adapter from "enzyme-adapter-react-16";
import {wrap} from "module";

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
		renderer.create(
			<MockedProvider mocks={[]}>
				<ActivityFeed/>
			</MockedProvider>
		);
    });
    
    test("Get snapshot", () => {
        const wrapper = shallow(<ActivityFeed/>);
        expect(wrapper).toMatchSnapshot();
    })


	it("renders loading state", () => {
		const component = mount(
			<MockedProvider mocks={[]}>
				<ActivityFeed/>
			</MockedProvider>
		);

        //const tree = component.toJSON();
        //console.log(component.debug());
		expect(component.matchesElement(<LoadingSpinner/>)).to.equal(true);
	});


	it("renders error ui when there is an issue", () => {
        const component = renderer.create(
			<MockedProvider mocks={[]}>
				<ActivityFeed/>
			</MockedProvider>
		);
          
        
        const tree = component.toJSON();
		expect(tree.children).toContain("GraphQL Error");
	});

	it("renders the orders", async () => {

        const component = mount(
			<MockedProvider mocks={mocks}>
				<ActivityFeed/>
			</MockedProvider>
        );
        
        expect(component.find("ActivityCard")).to.equal(true);

        
	});


});