import React, {Component} from "react"; 
import {Mutation, Query} from "react-apollo";
import {Link} from "react-router-dom";
import {ORDER_LIST}from "../graphql/Queries";
import { CSVLink } from "react-csv";
import * as Icon from 'react-feather';
import { Col, Container, Row, Table, Badge } from "react-bootstrap";
import DisplayLarge from "../components/typography/DisplayLarge";
import Heading from "../components/typography/Heading";
import Textbody from "../components/typography/Textbody";
import Subheading from "../components/typography/Subheading";
import LoadingSpinner from "../components/LoadingSpinner";
import Info from "../components/Info";
import {timeDifferenceForDate} from "../utils";
const Json2csvParser = require("json2csv").Parser;


export default class Dashboard extends Component {
	constructor(props){
		super(props);


        this.state = {
            loading: false
        }
		
    }
    

   
    
	render(){

        

     
		return(
			<div>
				<Container>
                    <Row>
                        <Col>
                        <DisplayLarge className="text-center">Dashboard</DisplayLarge>
                        </Col>
                    </Row>
                </Container>

				<Container>
                <Query query={ORDER_LIST}>
					{({data}, loading, error) => {
						const fields = [
							
                            "studentNumber",
                            "name",
                            "univeristy",
                            "bursary",
							"degree",
                            "cellNumber",
                            "email",
                            "address",
                            "ISBN",
                            "title",
                            "edition",
                            "author",
                            "dateOrdered",
                            "excelDate",
                            "deliveryDate",
                            "status",
                            "statusDate",
                            "ETA",
                            "Vendor",
                            "bookCondition",
                            "costPrice",
                            "sellingPrice",
                            "deliveryMethod",
                            "wayBillNumber",
                            "leadTime",
                            "courierCost",
                            "userId",
							"orderId",
						];
						const json2csvParser = new Json2csvParser({fields});
					
                    
						
                  
						if (loading) return <LoadingSpinner/>;
                        if (error) return <Info
                            text={`${error}`}
                            variant="danger"/>;
						if(!data) return <Info
                        text="Something went wrong, Please contact support if the issue persists"
                        variant="danger"/>;
                        if (data){
                         
                            
                            const csv = json2csvParser.parse(data.orderList);
                            
                            return (
                                <Row>
                                    <Col>
                                    
                                   <Heading >Export Orders to excel: 
                                   <CSVLink  data={csv}>
                                   <Icon.Download className="ml-4"/>
                            </CSVLink>
                                       </Heading>  
                                  
                                   </Col>
                                  
                                   
                                </Row>
                            );
						}
					}}


				</Query>
                </Container>
               
                <Query query={ORDER_LIST}>
                {({data, loading, error}) => {

          if (loading) return <LoadingSpinner/>;
          if(error) return <Info
                            text={`${error}`}
                            variant="danger"/>;
            const Orders = data.orderList.sort((l1,l2) => l2.dateOrdered - l1.dateOrdered);
           
              if (!data){
                  return <p>An issue has arisen</p>; 
              } else {
                return (
                    <Container>
                    <Row>
                        <Col>
                        <Subheading>There are a total of {Orders.length} orders.</Subheading>
                     <Table striped  hover>
                          <thead>
                              <tr>
                                  <th>
                                    <Subheading>Order ID
                                        </Subheading>
                                    </th>
                                  
                                  <th>
                                      <Subheading>Student Number
                                          </Subheading>
                                    </th>
                                  <th><Subheading>Name</Subheading></th>
                                 
                                  <th><Subheading>Title</Subheading></th>
                                 
                                  <th><Subheading>Date Ordered</Subheading></th>
                                  <th><Subheading>Status</Subheading></th>
                                  <th><Subheading></Subheading></th>
                              </tr>
                          </thead>
                          {Orders.map(orders =>(
                             
                          <tbody
                          key={orders.orderId}
                          >
                             
                                
                                <tr key={orders}>
                               
                                <td>
                                <Textbody>
                              {orders.orderId} 
                              </Textbody>
                              </td>
                             
                                <td><Textbody>{orders.studentNumber}</Textbody></td>
                                <td><Textbody>{orders.name}</Textbody></td>
                                <td><Textbody>{orders.title}</Textbody></td>
                                
                                <td><Textbody>{timeDifferenceForDate(parseInt(orders.dateOrdered))}</Textbody>
                                <Textbody>{orders.excelDate}</Textbody>
                                </td>
                                <td>
                                    {orders.orderStatus === null &&
                                    
                                    <Badge pill variant="danger">
                                {orders.orderStatus === null ? 'received' : orders.orderStatus}
                                </Badge>
                                    }

                                 {orders.orderStatus === "Delivered to Beneficiary" &&
                                    
                                    <Badge pill variant="success">
                                {orders.orderStatus}
                                </Badge>
                                    }

                                    {orders.orderStatus !== "Delivered to Beneficiary" && orders.orderStatus !== null && orders.orderStatus !== "received" &&
                                    
                                    <Badge pill variant="warning">
                                {orders.orderStatus}
                                </Badge>
                                    }
                                    {orders.orderStatus === "received" &&
                                    <Badge pill variant="danger">
                                { orders.orderStatus}
                                </Badge>}
                                </td>
                                <td> 
                                <Link
                              to={`/orderinfo/${orders.orderId}/${orders.userId}`}
                              >
                              <Icon.Eye/>
                              </Link>
                              </td>
                            </tr>
                                
                            
                           
                          </tbody>
                          
                          )
                           )}
                     </Table>
                        </Col>
                    </Row>
                </Container>
                )
                  
              }
  
               
                }}
                </Query>
			</div>
                
		);
        
        
	}
}