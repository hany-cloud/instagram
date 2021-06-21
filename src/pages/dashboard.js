// Hooks
import { useContext, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

// Styles
import styled from "styled-components";
import tw from "twin.macro";

// Components
import Navbar from "../components/navbar";
import Timeline from "../components/dashboard-timeline";
import Sidebar from "../components/suggestions-sidebar";
import UserContext from '../context/user';

// Contants
import { SCREENS } from "../constants/css-responsive";

const DbContentWrapper = styled.div`
    ${tw`    
      grid 

      grid-cols-1 
      md:grid-cols-3

      gap-4 
      justify-between 

      mx-auto 
      max-w-screen-lg    
    `}
`;

export default function Dashboard() {
  const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });
  const { userDoc: loggedInUser } = useContext(UserContext);

  // unconditional side effect after each render for dashboard component
  useEffect(() => {
    // set the page title
    document.title = 'Instagram';
  });
  
  return (    
    <>
      <Navbar />
      <DbContentWrapper>
        <Timeline loggedInUserId={loggedInUser?.userId} loggedInUserFollowing={loggedInUser?.following} />
        {!isMobile ? (
          <Sidebar loggedInUser={loggedInUser || {}} />
        ) : (
          null
        )}
      </DbContentWrapper>
    </>
  );
}