import gql from "graphql-tag";

export const PLACE_ORDER_MUTATION = gql`
    mutation PlaceOrderMutation($ISBN: String!,$title: String!,$edition: String!,$author:String!){
        placeOrder(ISBN:$ISBN, title:$title,edition:$edition,author:$author){
            orderId
            ISBN
            title
            edition
            author
        }
    }
`;
