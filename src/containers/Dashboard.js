import React, {Component} from "react"; 
import {Mutation, Query} from "react-apollo";
import {Link} from "react-router-dom";
import {ORDER_LIST}from "../graphql/Queries";
import { CSVLink } from "react-csv";
import * as Icon from 'react-feather';
import { Col, Container, Row, Table } from "react-bootstrap";
import DisplayMedium from "../components/typography/DisplayMedium";
import DisplayLarge from "../components/typography/DisplayLarge";
import Heading from "../components/typography/Heading";
import LoadingSpinner from "../components/LoadingSpinner";
import Info from "../components/Info";
const Json2csvParser = require("json2csv").Parser;


export default class Dashboard extends Component {
	constructor(props){
		super(props);

		
	}
    
	render(){

        
		return(
			<div>
				<Container>
                    <Row>
                        <Col>
                        <DisplayLarge>Dashboard</DisplayLarge>
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
                            const csv = json2csvParser.parse(data.orderList);
                            console.log(data);
                            
                            return (
                                <div>
                              <Heading>Export Orders to excel:</Heading>  
                                    <CSVLink  data={csv}><Icon.Download/></CSVLink>
                                   
                                </div>
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
           console.log(Orders); 
              if (!data){
                  return <p>An issue has arisen</p>; 
              } else {
                return (
                    <Container>
                    <Row>
                        <Col>
                     <Table striped bordered hover>
                          <thead>
                              <tr>
                                  <th>Order ID</th>
                                  
                                  <th>studentNumber</th>
                                  <th>Name</th>
                                 
                                  <th>Title</th>
                                 
                                  <th>Date Ordered</th>
                                  <th>Status</th>
                              </tr>
                          </thead>
                          {Orders.map(orders =>(
                             
                          <tbody
                          key={orders.orderId}
                          >
                             
                                
                                <tr key={orders}>
                               
                                <td>
                                <Link
                              
                              to={`/orderinfo/${orders.orderId}/${orders.userId}`}
                              >
                              {orders.orderId} 
                              </Link>
                              </td>
                             
                                <td>{orders.studentNumber}</td>
                                <td>{orders.name}</td>
                                <td>{orders.title}</td>
                                
                                <td>{new Intl.DateTimeFormat().format(orders.dateOrdered)}</td>
                                <td>{orders.status}</td>
                                
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