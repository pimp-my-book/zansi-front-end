import React from "react";
import {Image} from "react-bootstrap";
import styled from "styled-components";
import DisplayMedium from "../../components/typography/DisplayMedium";
import Heading from "../../components/typography/Heading";
import Subheading from "../../components/typography/Subheading";
import Textbody from "../../components/typography/Textbody";

const FAQ = () => {

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

  const Questions = "https://s3.amazonaws.com/zansi-static-assest/Illustrations/undraw_questions_75e0.svg";


  const TextDiv = styled.div`
    margin-left: 20px;
    margin-top: 30px;
  `;


	return (
		<div>
			<Header>
				<div className="ml-4">
					<DisplayMedium>FAQ</DisplayMedium>
					<Heading className=" mt-4">Looking for clarity? This FAQ has you covered.</Heading>

				</div>
				<Image
					src={Questions}
					width={200}
					fluid
					className=" d-none d-lg-block"
				/>

			</Header>

			<TextDiv>
				<Subheading> 1.	I’m done using the book; can I return it for a different one?</Subheading>


				<ul>
                    <li>Unfortunately not, the book cannot be returned as more than one book is prescribed for a course and cannot be exchanged for the next book.
</li>
                    <li>Book returns only take place at the end of the semester and this will be communicated to you by your bursary.
</li>
                    
                </ul>
				<Subheading> 2.	I haven’t received my books yet?</Subheading>
                <ul>
                    <li>Please contact us on email or by phone. (065 850 5225)</li>
                   
                </ul>

                <Subheading>3.	I haven’t received my book yet but my correspondence with you says it’s been delivered?</Subheading>
                <ul>
                    <li>Sometimes the courier delivers the book to the reception at your residence or apartment and not directly to your room. Some residences do not allow the couriers to deliver to the students dormitory rooms.
</li>
                    <li>Go to your Res reception and check if the book was delivered there.
</li>
                    <li>You can also contact us if you still cannot find your package.
</li>
                </ul>
                <Subheading>4.	Can I order on Watsapp?</Subheading>
                <ul>
                    <li>Unfortunately not, all orders are processed via the form on zansi.co.za.
</li>
                    <li>Only queries can be communicated on watsapp.
</li>
                    
                </ul>
                <Subheading>
                5.	I’m in class, Can I collect afterhours?
                </Subheading>
                <ul>
                    <li>Please contact us so we can arrange the best possible solution for both parties</li>
                    </ul>
                    <Subheading>6.	When can I expect to receive my books once after I have placed an order?</Subheading>
      
                    <ul>
                    <li>If the book is in stock in our stores or our partner stores you should get the book within 2 – 4 working days.
</li>
                    <li>If the book is not in stock it will put “on order” where we order it from a publisher or supplier. This should take 1 -2 weeks. 
</li>
                    <li>Overseas books which are not available anywhere in the country could take longer than 3 weeks to bring in. In such cases we will try to offer you an e-book or find an alternative.
</li>
                </ul>
                <Subheading>7.	Can I chose if I want a new or used book?</Subheading>
                <ul>
                    <li>Your bursary decides whether we should supply used or new books, so you cannot chose.
</li>
                    <li>For bursaries that have selected used books, we first try to supply the book second hand if it is in stock, otherwise we will supply a new book.
</li>
                    
                </ul>
      </TextDiv>
        

		</div>
	);
};

export default FAQ;


/*
				<ul>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul> */