import React, {Component} from "react"; 
import { Query} from "react-apollo";
import { Col, Container, Row,  Badge } from "react-bootstrap";
import {VIEW_ORDER}from "../graphql/Queries";
import * as Icon from 'react-feather';
import DisplayLarge from "../components/typography/DisplayLarge";
import DisplayMedium from "../components/typography/DisplayMedium";
import Heading from "../components/typography/Heading";
import Textbody from "../components/typography/Textbody";
import Subheading from "../components/typography/Subheading";
import LoadingSpinner from "../components/LoadingSpinner";
import LinkButton from "../components/LinkButton";
import Info from "../components/Info";
import {timeDifferenceForDate} from '../utils'

export default class OrderInfo extends Component {
    constructor(props){
		super(props);

		
	}
    
	render(){
        const {orderId, userId} = this.props.match.params;
        console.log(orderId);
        console.log(userId);

        return(
            <div>
                <Container>
                    <Row>
                        <Col>
                        <DisplayLarge>
                        Order Info
                        </DisplayLarge>
                        </Col>
                    </Row>
                </Container>
                
               <Query query={VIEW_ORDER}
               variables={{orderId: orderId,
                userId: userId}}>
                {({error, loading, data}) => {
                    if (loading) return <p>loading</p>;
                    if (error) return <p>error</p>;
                     const orderInfo = data.viewOrder;
                    return(
                        <Container>
                            <Row>
                                <Col>
                              <DisplayMedium><Icon.Info/> {orderInfo.orderId}</DisplayMedium>
                             
                                <Heading><Icon.Book/>{orderInfo.title}</Heading>
                                <Heading>ISBN: {orderInfo.ISBN}</Heading>
                                <Heading>Author: {orderInfo.author}</Heading>
                                <Heading>Edition: {orderInfo.edition}</Heading>
                                <Heading>Status: <Badge pill variant="info">{orderInfo.status}</Badge></Heading>
                                <Heading><Icon.Clock/> ordered {timeDifferenceForDate(parseInt(orderInfo.dateOrdered))}</Heading>
                               
                                </Col>

                                 <Col>
                                <DisplayMedium><Icon.User/> {orderInfo.name}</DisplayMedium>
                                <Heading> <Icon.Hash/>{orderInfo.studentNumber}</Heading>
                                <Heading><Icon.Mail/> {orderInfo.email}</Heading>
                                <Heading> University: {orderInfo.univeristy}</Heading>
                                <Heading> Degree: {orderInfo.degree}</Heading>
                                <Heading> Bursary: {orderInfo.bursary}</Heading>
                                <Heading> <Icon.Phone/> {orderInfo.cellNumber}</Heading>
                                <Heading> <Icon.Home/> {orderInfo.address}</Heading>
                               
                               
                               
                                </Col>
                            </Row>

                           
                        </Container>
                        
                        
                    )
                }}
               </Query>
               <Container>
                            <Row>
                                <Col>
                                <LinkButton sm href="/dashboard" >Back to dashboard</LinkButton>
                                </Col>
                            </Row>
                        </Container>
            </div>
        )
    }
}