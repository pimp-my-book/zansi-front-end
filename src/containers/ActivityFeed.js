import React, {Component} from "react"; 
import { Query} from "react-apollo";
import styled from "styled-components";
import { Col, Container, Row,  Badge, Form, Collapse, ListGroup } from "react-bootstrap";
import {VIEW_ORDER}from "../graphql/Queries";
import * as Icon from "react-feather";
import DisplayLarge from "../components/typography/DisplayLarge";
import DisplayMedium from "../components/typography/DisplayMedium";
import Heading from "../components/typography/Heading";
import Textbody from "../components/typography/Textbody";
import LoadingSpinner from "../components/LoadingSpinner";
import {timeDifferenceForDate} from "../utils";
import Info from "../components/Info";

export default class ActivityFeed extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <>
            <Container>
                <Row>
                    <Col>
                    <DisplayLarge>
                          Activity Feed
 							</DisplayLarge>
                    </Col>
                </Row>
            </Container>
              
            </>
        )
    }
}