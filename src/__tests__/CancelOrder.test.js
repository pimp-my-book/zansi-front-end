import React from 'react';
import {MockedProvider} from "react-apollo/test-utils";
import renderer from "react-test-renderer";
import CancelOrder from "../containers/CancelOrder";
import {CANCEL_ORDER} from "../graphql/Mutations";
import LoadingSpinner from "../components/LoadingSpinner";
import {mount,configure,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as Icon from "react-feather";
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
            query: CANCEL_ORDER, variables: {orderId: "1234", userId: "1234"}
        },
        result: {
            data: {
                cancelOrder: {
                    
                        orderId: "1234",
                        name: "SBTRK",
                        status: "Cancel Requested",
                        updateDate: "2 days ago"
                    
                }
            }
        }
    }
];

const defaultProps = {
    match: {params: {orderId: "1234", userId: "1234"}}
}

describe("<CancelOrder/>", () => {

    it("renders without crashing", () => {
        renderer.create(
			<MockedProvider mocks={[]}>
				<CancelOrder {...defaultProps}/>
			</MockedProvider>
		);
    });

    test("Get snapshot", () => {
        const wrapper = shallow(<CancelOrder {...defaultProps}/>);
        expect(wrapper).toMatchSnapshot();
    })


    it("renders loading state for order information", () => {
        const component = mount(
			<MockedProvider mocks={[]}>
				<CancelOrder {...defaultProps}/>
			</MockedProvider>
		);

        //const tree = component.toJSON();
        //console.log(component.debug());
		expect(component.matchesElement(<LoadingSpinner/>)).to.equal(true);
    });


    it("renders error ui when there is an issue", () => {

        const component = mount(
			<MockedProvider mocks={[]}>
				<CancelOrder {...defaultProps}/>
			</MockedProvider>
        );
        
        expect(component.find(<Icon.Trash2/>)).to.equal(true);
        expect(component.find("Form")).to.equal(true);
        
    });

    it("updates the status of the order", () => {

        const component = mount(
			<MockedProvider mocks={[]}>
				<CancelOrder {...defaultProps}/>
			</MockedProvider>
        );
        
        expect(component.find(<Icon.Trash2/>)).to.equal(true);


    });


});