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



export const EXPORT_TO_EXCEL = gql`
   query EXPORT_TO_EXCEL{
       exportToExcel{
     orderId
     userId
     studentNumber
     name
     email
     univeristy
     degree
     bursary
     cellNumber
     address

     ISBN
     title
     edition
     author
     dateOrdered
     status
       }
   }
`;