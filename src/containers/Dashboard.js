import React, {Component} from "react"; 
import {Mutation, Query} from "react-apollo";
import {EXPORT_TO_EXCEL}from "../graphql/Queries";
import { CSVLink, CSVDownload } from "react-csv";
const Json2csvParser = require('json2csv').Parser;

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
                    const csv = json2csvParser.parse(data.exportToExcel);
                   console.log(data);
                   
                   if (loading) return <p>loading...</p>;
                   if (error) return <p>something is up</p>;
                   return (
                       <div>
                           export to excel: 
                           <CSVLink  data={csv}>Download</CSVLink>
                       </div>
                   )
              }}


             </Query>
                </div>
                
            )
        
        
    }
}