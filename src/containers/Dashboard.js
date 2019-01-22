import React, {Component} from "react"; 
import {Mutation, Query} from "react-apollo";
import {EXPORT_TO_EXCEL}from "../graphql/Queries";
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
				<Query query={EXPORT_TO_EXCEL}>
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
                            const csv = json2csvParser.parse(data.exportToExcel);
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
                <Query query={EXPORT_TO_EXCEL}>
                {({data, loading, error}) => {

          if (loading) return <p>loading...</p>;
          if(error) return <p>Something is in the water</p>;
            const Orders = data.exportToExcel;
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
                                  <th>User Id</th>
                                  <th>studentNumber</th>
                                  <th>Name</th>
                                  <th>Email</th>
                                  <th>univeristy</th>
                                  <th>Degree</th>
                                  <th>Bursary</th>
                                  <th>Cell Number</th>
                                  <th>Address</th>
                                  <th>ISBN</th>
                                  <th>Title</th>
                                  <th>Edition</th>
                                  <th>Author</th>
                                  <th>Date Ordered</th>
                                  <th>Status</th>
                              </tr>
                          </thead>
                          <tbody>
                            {Orders.map(orders =>(
                                <tr key={orders}>
                                <td>{orders.orderId}</td>
                                <td>{orders.userId}</td>
                                <td>{orders.studentNumber}</td>
                                <td>{orders.name}</td>
                                <td>{orders.email}</td>
                                <td>{orders.univeristy}</td>
                                <td>{orders.degree}</td>
                                <td>{orders.bursary}</td>
                                <td>{orders.cellNumber}</td>
                                <td>{orders.address}</td>
                                <td>{orders.ISBN}</td>
                                <td>{orders.title}</td>
                                <td>{orders.edition}</td>
                                <td>{orders.author}</td>
                                <td>{new Date(orders.dateOrdered).toLocaleString()}</td>
                                <td>{orders.status}</td>
                             
                            </tr>

                            )
                              
                            )}
                          </tbody>
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