import React from 'react';
import {Container,Row, Col, Image} from "react-bootstrap";

const Body = () => {

    const ImgURL= "https://s3.amazonaws.com/zansi-static-assest/Illustrations/undraw_accept_terms_4in8.svg"
    return(
        <Container>

            <Row>
                <Row>
                    <Col></Col>
                    <Col>
                    {/*
                    <Image
                    src={ImgURL}
                    width={200}
                    /> */}
                    </Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col></Col>
                </Row>
            </Row>
        </Container>
    )
}

export default Body;