// Hooks
import { useEffect } from 'react';

// Styles
import styled from "styled-components";
import tw from "twin.macro";

// Components
import Navbar from "../components/navbar";


const NotFoundText = styled.p`
    ${tw`    
      text-center 
      text-2xl
    `}
`;

export default function NotFound() {
  useEffect(() => {
    // set the page title
    document.title = 'Not Found - Instagram';
  });

  return (
    <>
      <Navbar />
      <NotFoundText>Not Found!</NotFoundText>
    </>
  );
}
