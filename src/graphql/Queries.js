import gql from 'graphql-tag';


export const HELLO_QUERY = gql`
 query HELLO_QUERY{
     hello 
 }
`;


export const GET_ORDERS = gql`
   {
      order @client {
          orderId
      }
  }
`;