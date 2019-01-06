import React from "react";
import {Container,Row, Col, Image} from "react-bootstrap";
import DisplayMedium from "./typography/DisplayMedium";
import DisplaySmall from "./typography/DisplaySmall";

const Body = () => {

	const ImgURL= "https://s3.amazonaws.com/zansi-static-assest/Illustrations/undraw_accept_terms_4in8.svg";
    const PlaceOrder = "https://s3.amazonaws.com/zansi-static-assest/Illustrations/undraw_choose_80qg.svg";
    const Confirmed = "https://s3.amazonaws.com/zansi-static-assest/Illustrations/undraw_order_confirmed_1m3v.svg";
    const Comms = "https://s3.amazonaws.com/zansi-static-assest/Illustrations/undraw_mail_2_tqip.svg";
    const Deliver = "https://s3.amazonaws.com/zansi-static-assest/Illustrations/undraw_logistics_x4dc.svg";


    return(
		<Container>
            <Row >
                 <DisplayMedium className="mx-auto">
                    The Process In A Nuttshell
                    </DisplayMedium>
            </Row>
   
			<Row >

					<Col lg="4" sm="2">
						<DisplaySmall>Sign up!
						</DisplaySmall> 
					</Col>
					<Col xs={6} className="justify-content-sm-center">
                    
						<Image
							src={ImgURL}
							width={200}
						/> 
					</Col>
				
				
				
                    </Row>
                   
                    <Row >

					<Col>
                    <Image
							src={PlaceOrder}
							width={200}
						/> 
						
					</Col>
					<Col>
                    <DisplaySmall>Place Your Order
						</DisplaySmall> 
						
					</Col>
				
				
				
                    </Row>



                    <Row>
                        <Col>
                        <DisplaySmall>Get Confirmation
						</DisplaySmall> 
                        
                        </Col>
                        <Col>
                        <Image
							src={Confirmed}
							width={200}
						/> 
                        </Col>
                    </Row>

                      <Row>
                        <Col>
                        <Image
							src={Comms}
							width={200}
						/> 
                        
                        </Col>
                        <Col>
                        

                        <DisplaySmall>Constant Updates
						</DisplaySmall> 
                        </Col>
                    </Row>

                       <Row>
                        <Col>
                        <DisplaySmall>Textbooks Delivered
						</DisplaySmall> 
                        
                        </Col>
                        <Col>
                        <Image
							src={Deliver}
							width={200}
						/> 
                        </Col>
                    </Row>
		</Container>
	);
};

export default Body;