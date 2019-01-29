import React from 'react';
import {MockedProvider} from "react-apollo/test-utils";
import renderer from "react-test-renderer";
import StudentOrderList from '../containers/StudentOrderList';
import {STUDENT_ORDER_LIST} from "../graphql/Queries";
import LoadingSpinner from "../components/LoadingSpinner";

/////////////////////////////////////////////////
/* Comoponent Behaviours
-- Student should be able to hit the API and get a list of all the orders they placed
: Land on page =>
: Seeing loading Spinner
: Have a list of orders rendered

--Post Condition for Success
- A list of orders should appear

--Post Condition for failure
- An info bar should appear with details to the error
- a picture with a link button should appear if the student has no orders
and once clicked be directed to the order page

Component Contracts
* Renders a loading spinner
* no state


*/

//////////////////////////////////////////////////



const mocks = [
    {
        request: {
            query: STUDENT_ORDER_LIST        
                
        },
        result: {
            data: {
                studentOrderList:  {
                        orderId: "34444444343",
                        title: "Steve Biko",
                        status: "recieved",
                        date: "2 days ago"
                    }, 
            
                    studentOrderList1:  {
                        orderId: "56454534343",
                        title: "Bon Iver",
                        status: "recieved",
                        date: "3 days ago"
                    }
            
                
            }
        }
    }
]



describe('<StudentOrderList/>', ()=> {

  
    it('renders without crashing', () => {
      renderer.create(
        <MockedProvider mocks={[]}>
          <StudentOrderList/>
          </MockedProvider>
      )
    });


    
it('should render loading state initially', () => {
    const component = renderer.create(
        <MockedProvider mocks={[]}>
        <StudentOrderList />
        </MockedProvider>
    );

    const tree = component.toJSON();
    expect(tree.children).toContain(<LoadingSpinner/>);
});

it('renders all the students orders', ()=>{
    <MockedProvider mocks={[mocks]}>
    <StudentOrderList />
    </MockedProvider>

})

    
    
    });