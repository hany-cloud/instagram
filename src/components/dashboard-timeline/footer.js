import PropTypes from 'prop-types';

// Styles
import styled from "styled-components";
import tw from "twin.macro";

import { PostOwnerNameBase } from './post.styles';

const PostFooterWrapper = styled.div`
    ${tw` 
      p-4 
      pt-2 
      pb-1
    `}
`;

const PostOwnerName = styled(PostOwnerNameBase)`
    ${tw` 
      mr-1
    `}
`;

const PostTitle = styled.span`
    ${tw` 
      italic
    `}
`;

export default function Footer({ caption, username }) {
  return (
    <PostFooterWrapper>
      <PostOwnerName>{username}</PostOwnerName>
      <PostTitle>{caption}</PostTitle>
    </PostFooterWrapper>
  );
}

Footer.propTypes = {
  caption: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired
};
