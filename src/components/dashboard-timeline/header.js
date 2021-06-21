import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

// Styles
import styled from "styled-components";
import tw from "twin.macro";

import { PostOwnerNameBase } from './post.styles';

// Components
import { UserProfileRoundedImage, ImageScales } from '../userProfileRoundedImage';

const PostHeaderWrapper = styled.div`
    ${tw` 
      flex 
      
      border-b border-gray-primary 
      h-4 
      px-2 
      py-8
    `}

    & > a {
      ${tw` 
        flex 
        items-center
      `}
    }
`;

export default function Header({ username }) {
  return (
    <PostHeaderWrapper>
       <Link to={`/p/${username}`}>          
          <UserProfileRoundedImage username={username} maxWidth={ImageScales.md} />         
          <PostOwnerNameBase>{username}</PostOwnerNameBase>  
        </Link>
    </PostHeaderWrapper>
  );
}

Header.propTypes = {
  username: PropTypes.string.isRequired
};
