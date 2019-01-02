import React from 'react';
import styled from "styled-components";
import {Container, Row,Col} from "react-bootstrap";

const Text = styled.h1`
  text-align:center;
`;

export default () => 
 <Container>
   <Row>
       <Col> <Text>The page you are looking for does not exist!</Text></Col>
   </Row>
     
 </Container>