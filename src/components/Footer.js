import React from "react";
import styled from "styled-components";
import {Container,Row, Col,} from "react-bootstrap";
import Textbody from "./typography/Textbody";

const FooterStyles = styled.footer`
  
margin-top: 30px;
`;

const Footer = () => 
  <FooterStyles>
      <Container>
          <Row>
          <Textbody className="mx-auto mt-4">A Pimp My Book Service</Textbody>
          </Row>
      </Container>
      
  </FooterStyles>;

  export default Footer;