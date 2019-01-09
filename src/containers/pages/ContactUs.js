import React from "react";
import {Image} from "react-bootstrap";
import styled from "styled-components";
import DisplayMedium from "../../components/typography/DisplayMedium";
import Heading from "../../components/typography/Heading";
import Subheading from "../../components/typography/Subheading";
import Textbody from "../../components/typography/Textbody";

const HowItWorks = () => {

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

	const Progress = "https://s3.amazonaws.com/zansi-static-assest/Illustrations/undraw_in_progress_ql66.svg";


  const TextDiv = styled.div`
    margin-left: 40px;
  `;


	return (
		<div>
			<Header>
				<div className="ml-4">
					<DisplayMedium>How It works</DisplayMedium>
					<Heading className=" mt-4">This page is meant to fimilarize you with the process of how the we at Pimp My Book will get you the books you ordered.</Heading>

				</div>
				<Image
					src={Progress}
					width={200}
					fluid
					className=" d-none d-lg-block"
				/>

			</Header>

			<TextDiv>
				<Subheading> 1. Placing Orders</Subheading>
				<Textbody>Go to www.zansi.co.za 
           Click “order now” and complete the order google form
				</Textbody>
			</TextDiv>
        

		</div>
	);
};

export default HowItWorks;


