import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import {MockedProvider} from "react-apollo/test-utils";
import {ORDER_LIST}from "../graphql/Queries";
import Dashboard from "../containers/Dashboard";
import {mount,configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import LoadingSpinner from "../components/LoadingSpinner";
import {wrap} from "module";
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
					status: "Recieved",
                    dateOrdered: "2 days ago",
                    title: "Such a Savage"
				}, 
        
				order2: {
					orderId: "4535343423423",
					name: "Bakar",
					status: "Recieved",
                    dateOrdered: "2 days ago",
                    title: "One Way Road"
				}, 
				order3: {
					orderId: "235234324",
					name: "Brooke",
					status: "Cancel Requested",
                    dateOrdered: "2 days ago",
                    title: "Say My Name Across the Boarder"
				}, 
			}
		}
	}
];


describe("<Dashboard/>", ()=> {

  
	it("renders without crashing", () => {
		renderer.create(
            <MockedProvider mocks={[]}>
               <Dashboard/>
            </MockedProvider>
			
		);
	});

	test("Get Snapshot", () => {
		const wrapper = shallow(<Dashboard/>);
		expect(wrapper).toMatchSnapshot();
	});
    

    it("renders the loading state", () => {
        
           const wrapper = mount(
                <MockedProvider mocks={[]}>
                   <Dashboard/>
                </MockedProvider>
                
            );

            expect(wrapper).toContain(<LoadingSpinner/>);
        
    })
    
});
    