import React from "react";
import  {Image} from "react-bootstrap";
import DisplayMedium from "./typography/DisplayMedium";
import DisplaySmall from "./typography/DisplaySmall";
import styled from "styled-components";
import Textbody from "./typography/Textbody";
import Card from "./Card";
import {Container, Col, Row} from "react-bootstrap";


const Body = () => {

	const ImgURL= "https://s3.amazonaws.com/zansi-static-assest/Illustrations/undraw_accept_terms_4in8.svg";
	const PlaceOrder = "https://s3.amazonaws.com/zansi-static-assest/Illustrations/undraw_choose_80qg.svg";
	const Confirmed = "https://s3.amazonaws.com/zansi-static-assest/Illustrations/undraw_order_confirmed_1m3v.svg";
	const Comms = "https://s3.amazonaws.com/zansi-static-assest/Illustrations/undraw_mail_2_tqip.svg";
	const Deliver = "https://s3.amazonaws.com/zansi-static-assest/Illustrations/undraw_logistics_x4dc.svg";
	const Forgot = "https://s3.amazonaws.com/zansi-static-assest/Illustrations/undraw_forgot_password_gi2d.svg";
	const Empty = "https://s3.amazonaws.com/zansi-static-assest/Illustrations/undraw_empty_xct9.svg";



	const Grid =  styled.div`
     display: grid;
     grid-gap: 20px;
     grid-template-columns: repeat(2,1fr);
     margin-top: 100px;
     margin-left:250px;

     @media (max-width: 600px){
        grid-template-columns: repeat(auto-fit,minmax(350px,1fr));
        margin:20px;
     }
    `;


	const CardGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	justify-items: center;
	margin-top: 10px;
	
	`;

    const ResponsiveWrapper = styled.div`
     @media (max-width:600px){
         margin-right:20px;
     }
    `

	return(
		<div>
			
				
					<DisplayMedium className="mx-auto text-center">
                    The Process In A Nuttshell
					</DisplayMedium>
                
        		<Grid>
				<div>
					<DisplaySmall main>Placing Orders
					</DisplaySmall> 
                    <ResponsiveWrapper>
                    <Textbody>Click the "Order Now" button to be redirected to the Google Form and complete it.</Textbody>
                    </ResponsiveWrapper>
                </div>
				<div>
					<Image
						src={PlaceOrder}
						width={200}
					/> 
				</div>
			</Grid>
			<Grid>
				<div>
					<DisplaySmall main>Status Updates
					</DisplaySmall>
                    <ResponsiveWrapper> 
                    <Textbody>You will recieve status updates, which will be communicated to you via the email address you provided.</Textbody>
                    </ResponsiveWrapper>

                </div>
				<div>
					<Image
						src={Confirmed}
						width={200}
					/> 
				</div>
			</Grid>

			<Grid>
				<div>
					<DisplaySmall main>Collections and Deliveries
					</DisplaySmall> 
                    <ResponsiveWrapper>
                    <Textbody>We will let you know about the delivery/collection process applicable for your orders.</Textbody>
                    </ResponsiveWrapper>

				</div>
				<div>
					<Image
						src={Deliver}
						width={200}
					/> 
				</div>
                    
			</Grid>
			<Grid>
				<div>
					<DisplaySmall main>Returns and Exchanges
					</DisplaySmall> 
                    <ResponsiveWrapper>

                    <Textbody>If there are any issues we will gladly give you a refund or exchange a book. Just email us at moshal@pimpmybook.co.za!</Textbody>
                    </ResponsiveWrapper>

				</div>
				<div>
					<Image
						src={Empty}
						width={200}
					/> 
				</div>

			</Grid>

		<CardGrid>
					<Card
	                    textBody="This is just a break down, please click below for a detailed overview."
	               textLink="More Details"
	              href="/how-it-works"
	                      />
				</CardGrid>
			
			
    
	
	
		
			

		</div>

	);
};

export default Body;
