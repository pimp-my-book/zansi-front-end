import React, {Component} from "react"; 
import {Mutation, Query} from "react-apollo";
import {Link} from "react-router-dom";
import {ORDER_LIST}from "../graphql/Queries";
import { CSVLink, CSVDownload } from "react-csv";
import { Col, Container, Row, Table } from "react-bootstrap";
import DisplayMedium from "../components/typography/DisplayMedium";
const Json2csvParser = require("json2csv").Parser;


export default class Dashboard extends Component {
	constructor(props){
		super(props);

		
	}
    
	render(){

        
		return(
			<div>
				<p>DASHBOARD</p>
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
					
                    
						
                   
						if (loading) return <p>loading...</p>;
						if (error) return <p>something is up</p>;
						if(!data) return <p>Something is wrong with the API</p>;
                        if (data){
                            const csv = json2csvParser.parse(data.orderList);
                            console.log(data);
                            
                            return (
                                <div>
                               export to excel: 
                                    <CSVLink  data={csv}>Download</CSVLink>
                                   
                                </div>
                            );
						}
					}}


				</Query>
                <Query query={ORDER_LIST}>
                {({data, loading, error}) => {

          if (loading) return <p>loading...</p>;
          if(error) return <p>Something is in the water</p>;
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
                             
                          <tbody>
                             <Link
                              key={orders.id}
                              to={`/orderinfo/${orders.orderId}/${orders.userId}`}
                              >
                                
                                <tr key={orders}>
                                
                                <td>{orders.orderId}</td>
                                
                                <td>{orders.studentNumber}</td>
                                <td>{orders.name}</td>
                                <td>{orders.title}</td>
                                
                                <td>{new Intl.DateTimeFormat().format(orders.dateOrdered)}</td>
                                <td>{orders.status}</td>
                                
                            </tr>
                                
                            
                            </Link>
                           
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