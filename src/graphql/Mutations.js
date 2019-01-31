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


export const UPDATE_ORDER_STATUS = gql`
   mutation UPDATE_ORDER_STATUS($orderId: String!, $userId:String!, $email: String!, $orderStatus: String!){
    updateOrderStatus(orderId:$orderId, userId:$userId, email:$email, orderStatus:$orderStatus){
        orderStatus
        statusDate
    }
   }

`;


export const UPDATE_ORDER_INFO = gql`
  mutation UPDATE_ORDER_INFO($orderId: String!, $userId:String!, $ETA: String, $Vendor: String, $bookCondition:String, $deliveryMethod: String,$deliveryDate: String, $costPrice: String,$sellingPrice: String,$wayBillNumber: String,$leadTime:String ){
    updateOrderInfo(orderId: $orderId, userId: $userId, ETA: $ETA, Vendor: $Vendor, bookCondition:$bookCondition, deliveryMethod: $deliveryMethod,deliveryDate: $deliveryDate, costPrice: $costPrice,sellingPrice: $sellingPrice,wayBillNumber: $wayBillNumber,leadTime:$leadTime ){
    
    ETA
    Vendor
    bookCondition
    deliveryDate
    deliveryMethod
    costPrice
    sellingPrice
    wayBillNumber
    leadTime
    }
  }
`;