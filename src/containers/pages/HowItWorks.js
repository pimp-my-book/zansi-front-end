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
    margin-left: 10px;
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
           
      <TextDiv>
         <Subheading>2.	Order Status Update</Subheading>
         <Textbody>You will get the following order status updates</Textbody>
         <ul>
           <li>Confirmation of order received – 24 hours</li>
           <li>ETA (Expected Turn Around) </li>
           <li>Dispatched  - Once the book is on its way to you</li>
           <li>Ready for collection -  When the book is ready to be collected at one of our stores or pick up points</li>
           <li>Delivered/ Collected – When the courier has delivered the book to you.</li>
           <li>On Order (ETA)</li>
         </ul>

         <Textbody>We will use the email address that you provide to update you on your order status. </Textbody>
         <Textbody>You are also welcome to contact us at: moshal@pimpmybook.co.za or whatsapp 065 850 5225  (always provide your student number to help us to quickly identify your order).</Textbody>
        </TextDiv>
        <TextDiv>
          <Subheading>3.Collections and Deliveries</Subheading>
          <Textbody>Note: we will inform each student about the delivery/collection method applicable to their specific order.</Textbody>
          <Subheading>3.1	Collections from our stores</Subheading>
          <ul>
            <li>Students studying at the following universities will collect at our stores at your campus: University of Cape Town, University of Stellenbosch, University of Free State and University of Pretoria.
</li>
<li>Please bring along your student card or id when collecting.
</li> 
<li>There will be a dedicated person to assist within the stores. Tell the people at the counter that you are from Moshal and they will indicate the person to you. Please do not wait in the lines for walk in customers but go straight to the counter and inform them that you are a Moshal student.
</li>
<li>See link showing the physical address of our stores: http://www.pimpmybook.co.za/find-shops/
</li>
          </ul>
          <Subheading>3.2	Collections from Adams Bookstores (UKZN students only)</Subheading>
          <ul>
            <li>Students studying at the University of Kwa Zulu Natal will collect some of their books at Adams Bookstores. 
</li>
<li>Medical students will collect at Medi Books, Westville and Howard students will collect at the stores on those respective campuses.
</li>
<li>Pietermaritzburg students will have their books couriered to them.
</li>
<li>Bring your student card or id for collections
</li>
<li>Bring your student card or id for collections
</li><li>Bring your student card or id for collections
</li>
          </ul>
          <Subheading>3.3	Delivery by courier</Subheading>
          <ul>
            <li>Students at NMMU, Rhodes, Wits and UKZN will have their books delivered to their campus champions for collections.</li>
            <li>We will communicate with you directly to inform you once your champion has received the books and they are ready for collection.</li>
          </ul>

          <Subheading>You can reach out to the following champions</Subheading>
          <ul>
            <li>Wits: Bongolwethu Harmans	(Bhongolwethuharmans98@gmail.com)</li>
            <li>RU: Phumelele Mabaso	(Sontoh94@gmail.com or rhodesstudents@moshalscholarship.org)</li>
           <li>NMMU: Innocent Ngiwaza	(s216735378@live.nmmu.ac.za or NMUstudents@moshalscholarship.org)</li>
          <li>UKZN (Medics)	Khomo	(khomo971007@gmail.com)

</li>
          </ul>
        </TextDiv>
        <TextDiv>
        <Subheading>4. Returns and Exchanges</Subheading>

       <Textbody> Should you wish to return or exchange a book please email moshal@pimpmybook.co.za and 
please provide the following details:</Textbody>


          <ul>
            <li>Your student number and name
</li>
<li>Details of the book: ISBN, Tittle, Edition
</li>
<li>Reason for return/exchange</li>
          </ul>

          <Textbody> Return process:</Textbody>


          <ul>
            <li>We will approve/reject the return within 48 hours
</li>
<li>All returns will be sent back to us in the same method that they were delivered to you. So if you collected you will have to return the books to the initial collection point and if it was sent to your champion you will return it to the champion.
</li>
<li>Note that you can only return the book after we have approved your return request.</li>
          </ul>
        </TextDiv>

		</div>
	);
};

export default HowItWorks;


/*
 <Subheading>3.1	Collections from our stores</Subheading>
          <ul>
            <li></li>
          </ul>
*/