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

export const STUDENT_ORDER_LIST = gql`
  query STUDENT_ORDER_LIST($userId: String!){
    studentOrderList(userId:$userId){
        orderId
        userId
        title
        dateOrdered
        orderStatus 
    }
  }
`;


export const ORDER_LIST = gql`
   query ORDER_LIST{
    orderList{
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
     excelDate
     ISBN
     title
     edition
     author
     orderStatus
     dateOrdered
     status
     updateDate
       }
   }
`;

export const VIEW_ORDER = gql`
  query VIEW_ORDER($orderId:String!,$userId:String!){
      viewOrder(orderId:$orderId, userId:$userId ){
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
     orderStatus
     dateOrdered
     statusDate
     excelDate
     ETA
  Vendor
  bookCondition
  deliveryMethod
  deliveryDate
  costPrice
  sellingPrice
  wayBillNumber
  courierCost
  leadTime
  
      }
  }
`;
