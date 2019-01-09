import React from "react";
import {Image} from "react-bootstrap";
import styled from "styled-components";
import DisplayMedium from "../../components/typography/DisplayMedium";
import Heading from "../../components/typography/Heading";

const HowItWorks = () => {

  const Header = styled.header`
   display: grid;
   grid-gap: 2px;
   grid-template-columns: repeat(2, 1fr);
   justify-items: center;
   margin-top: 20px;
  `;

  const Progress = "https://s3.amazonaws.com/zansi-static-assest/Illustrations/undraw_in_progress_ql66.svg";



    return (
        <div>
           <Header>
             <DisplayMedium>How It works</DisplayMedium>
               <Image
               src={Progress}
               width={200}
               />

           </Header>
           <Heading className="text-center mt-4">This page is meant to fimilarize you with the process of how the we at Pimp My Book will get you the books you ordered.</Heading>
        </div>
    )
}

export default HowItWorks;