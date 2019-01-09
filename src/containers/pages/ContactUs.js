import React from "react";
import {Image} from "react-bootstrap";
import styled from "styled-components";
import DisplayMedium from "../../components/typography/DisplayMedium";
import Heading from "../../components/typography/Heading";
import Subheading from "../../components/typography/Subheading";
import Textbody from "../../components/typography/Textbody";

const ContactUs = () => {

	const Header = styled.header`
   display: grid;
   grid-gap: 2px;
   grid-template-columns: repeat(2, 1fr);
   justify-items: center;
   margin-top: 20px;

   @media (max-width: 600px) {
   text-justify:auto;
   grid-template-columns: 1fr;
     margin-left:10px;
   }
  `;

  const Email = "https://s3.amazonaws.com/zansi-static-assest/Illustrations/undraw_emails_6uqr.svg";


  const TextDiv = styled.div`
    margin-left: 20px;
  `;


	return (
		<div>
			<Header>
				<div className="ml-4">
					<DisplayMedium>Get In Touch</DisplayMedium>
					<Heading className=" mt-4">How to get a hold of us.</Heading>

				</div>
				<Image
					src={Email}
					width={200}
					fluid
					className=" d-none d-lg-block"
				/>

			</Header>

			<TextDiv>
				<Subheading> Email:moshal@pimpmybook.co.za



</Subheading>

<Subheading>Whatsapp:  065 850 5225</Subheading>
<Subheading>Call Us:     065 850 5225</Subheading>
				<Textbody>In case of any serious issue, delays with orders, bad service and complaints please contact Thandi via her personal watsapp number: 084 336 2139.
</Textbody>
			</TextDiv>
        

		</div>
	);
};

export default ContactUs;


