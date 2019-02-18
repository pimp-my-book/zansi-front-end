import React from 'react';
import ReactDOM from 'react-dom';
import renderer from "react-test-renderer";
import OrderInfo from "../containers/OrderInfo";
import {mount,configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {wrap} from 'module';
configure({adapter: new Adapter()});

/////////////////////////////////////////////////
/* Comoponent Behaviours
-- PMB Staff should be able to see information about an order and also 
update its status and its info. 

: land one page =>
: View Order Info =>
: update status ?  opens modal and choose status  +
   send email => 
: update order info? opens modal and enter details =>

--Post Condition for Success
 [ ] update status ? the order status chould be changed to
 what args.orderStatus was. The badge colour should change based on 
 the status.Student should recieve an email. 
 [ ] update order info ? the fields in the order info shoudl be 
 pipulated. 

--Post Condition for failure
[ ] network error connection
[ ] the stauts does not get updated
[ ] student has invalid email it does not send. 
[ ] the order info fields do not get populated

Component Contracts
({}) state: show, showDetails, orderStatus

({}) has to update the cache 

({}) Query - VIEW_ORDER 

({}) Query - VIEW_ORDER + Mutation - UPDATE_ORDER_STATUS + 
Modal daialog

({}) Query - VIEW_ORDER + Mutation - UPDATE_ORDER_INFO + 
Modal daialog

*/
//////////////////////////////////////////////////
describe('<OrderInfo/>', ()=> {

  
    it('renders without crashing', () => {
      renderer.create(
          <OrderInfo/>
      )
    });

    it('renders loading UI to get order info', () => {

    });


    it('renders the order info', () => {

    });

  
    it('renders error ui if cannot get order info', () => {

    });



    it('updates the order status', () => {

    });

    it('renders error ui when failing to update order status', () => {

    });

    it('updates the order info', () => {

    });

    it('renders error ui when failing to update order info', () => {

    });

});
    