import React, {Component} from "react"; 
import { Query} from "react-apollo";
import {VIEW_ORDER}from "../graphql/Queries";


export default class OrderInfo extends Component {
    constructor(props){
		super(props);

		
	}
    
	render(){
        const {orderId, userId} = this.props.match.params;
        console.log(orderId);
        console.log(userId);

        return(
            <div>
                Order Info
               <Query query={VIEW_ORDER}
               variables={{orderId: orderId,
                userId: userId}}>
                {({error, loading, data}) => {
                    if (loading) return <p>loading</p>;
                    if (error) return <p>error</p>;
                     const orderInfo = data.viewOrder;
                    return(
                        <p>{orderInfo.title}</p>
                    )
                }}
               </Query>
            </div>
        )
    }
}