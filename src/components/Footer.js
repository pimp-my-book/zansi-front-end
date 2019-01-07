import React from "react";
import styled from "styled-components";
import {Container,Row, Col,} from "react-bootstrap";
import Textbody from "./typography/Textbody";

const FooterStyles = styled.footer`
  
margin-top: 200px;
position: absolute;
left: 0;
bottom: 0;
height: 100px;
width: 100%;

`;

const Link = styled.a`
 text-decoration: none;
 color: white;
`;
const Footer = () => 
  <FooterStyles>
      <Container>
          <Row>
              <Col className=" mt-4">
          <Textbody className="mx-auto mt-4"> <Link href="http://www.pimpmybook.co.za">Pimp My Book </Link>  &copy; 2019</Textbody>
          </Col>
          <Col className=" mt-4">
          <Textbody className="mx-auto mt-4">Made with <span aria-label="heart emoji">❤️</span> in Cape Town, <span aria-label="SA-emoji">🇿🇦</span></Textbody>
          </Col>
          </Row>
      
      </Container>
      
  </FooterStyles>;

  export default Footer;