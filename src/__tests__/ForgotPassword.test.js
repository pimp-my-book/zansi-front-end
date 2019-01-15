import React from 'react';
import ReactDOM from 'react-dom';
import renderer from "react-test-renderer";
import ForgotPassword from '../containers/ForgotPassword';

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

it('renders without crashing', () => {
    renderer.create(
        <ForgotPassword/>
    )
})