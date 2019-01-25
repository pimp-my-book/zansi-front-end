import React from "react";
import {Container,Row, Col, Image} from "react-bootstrap";
import DisplayMedium from "../../components/typography/DisplayMedium";
import DisplaySmall from "../../components/typography/DisplaySmall";
import LinkButton from "../../components/LinkButton";
import styled from "styled-components";
import Textbody from "../../components/typography/Textbody";

 const Body = () => {

	const ImgURL= "https://s3.amazonaws.com/zansi-static-assest/Illustrations/undraw_accept_terms_4in8.svg";
	const PlaceOrder = "https://s3.amazonaws.com/zansi-static-assest/Illustrations/undraw_choose_80qg.svg";
	const Confirmed = "https://s3.amazonaws.com/zansi-static-assest/Illustrations/undraw_order_confirmed_1m3v.svg";
	const Comms = "https://s3.amazonaws.com/zansi-static-assest/Illustrations/undraw_mail_2_tqip.svg";
	const Deliver = "https://s3.amazonaws.com/zansi-static-assest/Illustrations/undraw_logistics_x4dc.svg";

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
					<DisplaySmall>Sign up!
					</DisplaySmall> 
                    <ResponsiveWrapper>
                    <Textbody>Simply start by creating an account and provide us with your details.</Textbody>
                    <LinkButton href="/how-it-works">Learn More</LinkButton>
					</ResponsiveWrapper>
                </div>
				<div>
					<Image
						src={ImgURL}
						width={200}
					/> 
				</div>
			</Grid>
			<Grid>
				<div>
					<DisplaySmall>Place Your Order
					</DisplaySmall>
                    <ResponsiveWrapper> 
                    <Textbody>Then all you need to do is tell us exactly which books you need.</Textbody>
					<LinkButton href="/how-it-works">Learn More</LinkButton>
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
					<DisplaySmall>Get Confirmation
					</DisplaySmall> 
                    <ResponsiveWrapper>
                    <Textbody>Once your order is placed, we will let you know that it has been recevied by us.</Textbody>
					<LinkButton href="/how-it-works">Learn More</LinkButton>

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
					<DisplaySmall>Constant Updates
					</DisplaySmall> 
                    <ResponsiveWrapper>

                    <Textbody>We will also notify you of the different stages your order is going through.</Textbody>
					<LinkButton href="/how-it-works">Learn More</LinkButton>

				    </ResponsiveWrapper>

				</div>
				<div>
					<Image
						src={Comms}
						width={200}
					/> 
				</div>

			</Grid>
			<Grid>
				<div>
					<DisplaySmall>Textbooks Delivered
					</DisplaySmall> 
                    <ResponsiveWrapper>

                    <Textbody>Lastly, you will get your books delivered to the address of your choice.</Textbody>
					<LinkButton href="/how-it-works">Learn More</LinkButton>

				    </ResponsiveWrapper>

                </div>
				<div>
					<Image
						src={Deliver}
						width={200}
					/> 
				</div>
                    
			</Grid>

		</div>

	);
};


export default Body;