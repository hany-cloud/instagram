// Hooks
import { useMediaQuery } from "react-responsive";

import PropTypes from 'prop-types';

// Styles
import styled from "styled-components";
import tw from "twin.macro";

// Components
import Suggestions from './suggestions';
import User from './user';

// Contants
import { SCREENS } from "../../constants/css-responsive";

const SidebarWrapper = styled.div`
  ${tw`                
    p-4
  `}
`;

export default function Sidebar({ loggedInUser }) {
  const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });

  return (
    <SidebarWrapper>
      {!isMobile ? (
        <User username={loggedInUser?.username} fullName={loggedInUser?.fullName} />        
      ) : (
        null
      )}
      
      <Suggestions loggedInUserDocId={loggedInUser?.docId} loggedInUserId={loggedInUser?.userId} loggedInUserFollowing={loggedInUser?.following}/>
    </SidebarWrapper>
  );
}

// Sidebar.whyDidYouRender = true
Sidebar.propTypes = {
  loggedInUser: PropTypes.object
};