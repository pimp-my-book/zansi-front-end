import React from 'react';
import SecondaryButton from "../components/SecondaryButton";
import LinkButton from "../components/LinkButton";
import PrimaryButton from "../components/PrimaryButton";

export default () =>

<div>
    <h1>Component Palyground</h1>
    <SecondaryButton
                text="test"
                />
    <div className="mt-4 ml-5">
    <LinkButton href="https://www.root.co.za">I am link button</LinkButton>
  <PrimaryButton text="Prim Prim"/>
    </div>
                
</div>