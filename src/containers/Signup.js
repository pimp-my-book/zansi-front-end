import React, {Component} from "react";


export default class Signup extends Component {
    constructor(props){
        super(props);

   this.state = {
       isLoading: false,
       email: "",
       password: "",
       confirmPassword: "",
       studentNumber: "",
       fullName: "",
       university: "",
       degree: "",
       bursary: "",
       cellNumber: "",
       address: "",
       confirmationCode: "",
       newUser: null
   };
    }

    //validateForm

    //validateConfirmationForm

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = async event => {
        event.preventDefault();

        this.setState({isLoading: true});

        this.setState({newUser: "test"});

        this.setState({isLaoding: false});
    }


    handleConfirmationSubmit = async event => {
        event.preventDefault();

        this.setState({isLoading: true});


    }


    renderConfirmationForm(){
        return(
            <div>
                Conform
            </div>
        )
    }

    renderForm(){
        return(
            <div>
                form
            </div>
        )
    }
    render(){
        return (
            <div>
                {this.state.newUser == null
                ? this.renderForm()
                : this.renderConfirmationForm()}
            </div>
        )
    }
}