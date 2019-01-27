import React, {Component} from "react"; 
import {Mutation, Query} from "react-apollo";
import {Link} from "react-router-dom";
import {ORDER_LIST}from "../graphql/Queries";
import { CSVLink } from "react-csv";
import * as Icon from 'react-feather';
import { Col, Container, Row, Table, Badge } from "react-bootstrap";
import DisplayMedium from "../components/typography/DisplayMedium";
import DisplayLarge from "../components/typography/DisplayLarge";
import Heading from "../components/typography/Heading";
import Textbody from "../components/typography/Textbody";
import Subheading from "../components/typography/Subheading";
import LoadingSpinner from "../components/LoadingSpinner";
import Info from "../components/Info";
import {timeDifferenceForDate} from '../utils'
const Json2csvParser = require("json2csv").Parser;


export default class Dashboard extends Component {
	constructor(props){
		super(props);


        this.state = {
            orders: [],
            loading: false
        }
		
    }
    _formatDate = data => {
        //const orders = data.orderList;
        //return orders;
        const rawOrders = data.orderList
        return rawOrders;
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
							"userId",
							"orderId",
							"ISBN",
							"author",
							"dateOrdered",
							"edition",
							"status",
							"title",
							"email",
							"address",
							"bursary",
							"cellNumber",
							"degree",
							"name",
							"studentNumber",
							"univeristy",
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
                         
                            //const formatedOrders = this._formatDate(data);
                            //console.log(formatedOrders);
                            const csv = json2csvParser.parse(data.orderList);
                            console.log(data);
                            
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
            const Orders = data.orderList;
           
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
                                <Textbody>{new Intl.DateTimeFormat().format(orders.dateOrdered)}</Textbody>
                                </td>
                                <td>
                                <Badge pill variant="info">
                                {orders.status}
                                </Badge>
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