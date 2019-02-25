import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import ForgotPassword from "../containers/ForgotPassword";
//const wait = require("waait");
import {mount,configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {wrap} from "module";
configure({adapter: new Adapter()});
/////////////////////////////////////////////////////////////////////////////////
/* Component Behaviours

---The user should be able to submit their email to recieve a confirmation
code and be allowed to reset their password with Cognitio
:Enter Email address =>
:Click submit button =>
:validate Email => 
:redirect to password form =>
:Enter new password + confirmation code=>
: validate passwords + confirmation code =>
: redirect to confirmation page =!

-- Post Condition For Success

RE: Email Form
User needs to be redircted to password page

RE: Password Page
User needs to be redirected to confirmation page

RE: Confirmation Page
User needs to see a message telling them to be redirected to the Login Page


-- Component Contracts
- it renders serveral three different forms
- There are no props
- it has the following inital state: 
      code: "",
      email: "",
      password: "",
      codeSent: false,
      confirmed: false,
      confirmPassword: "",
      isConfirming: false,
      isSendingCode: false


*/
/////////////////////////////////////////////////////////////////////////////////
//configure enzyme adpater
configure({adapter: new Adapter()});

function type(wrapper, name,value) {
	wrapper.find(`Form.Control type=${name}`).simulate("change",{
		target: {name, value}
	});
}

describe("<ForgotPassword/>", () => {



	it("renders without crashing", () => {
		const component = renderer.create(
			<ForgotPassword/>
		);

		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
    
    
	it("calls the submit event for RequestCodeForm ", () =>{
		const onSubmitFn = jest.fn();
		const wrapper = mount(<ForgotPassword onSubmit={onSubmitFn}/>);
		
		wrapper.update();
		type(wrapper, "email", "me@goodmusic.com");
		wrapper.update();
		wrapper.find("Form").simulate("submit");
       
		expect(onSubmitFn).toHaveBeenCalledTimes(1);


	});
    
	it("Dispalys an error for email that is not on file", () =>{

		return null;
	});
    
    
	it("calls the submit event for RequestConfirmationForm", () =>{
		
		const onSubmitFn = jest.fn();
		const wrapper = mount(<ForgotPassword onSubmit={onSubmitFn}/>);
		
		wrapper.setSate({confirmed: true});
		type(wrapper, "tell", "00254874");
		type(wrapper, "password", "G3n!us");
		wrapper.update();
		wrapper.find("Form").simulate("submit");
       
		expect(onSubmitFn).toHaveBeenCalledTimes(1);
	});
    
	it("Dispalys an error for incorrect code or non-matching passwords", () =>{
		return null;
	});
    
	it("renders the success page", () =>{
		const onSubmitFn = jest.fn();
		const wrapper = mount(<ForgotPassword onSubmit={onSubmitFn}/>);
		
		wrapper.setSate({confirmed: false});

		expect(wrapper.find("DisplayMedium").text()).toContain("You Have a New Password!");
	});


});