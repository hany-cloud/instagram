// Hooks
import { useState } from 'react';

import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

// Styles
import styled from "styled-components";
import tw from "twin.macro";

// Components
import { UserProfileRoundedImage, ImageScales } from '../user-profile-rounded-image';
import { TitleBase } from './suggestions.styles';
import Button, { ButtonTheme } from '../button';

const SuggestionsLineWrapper = styled.div`
  ${tw`          
    flex 
    flex-wrap 
    items-center 
    justify-between

    flex-col
    md:flex-row
  `};
`;

const SuggestionsProfileWrapper = styled(SuggestionsLineWrapper)``;

const UserProfileTitle = styled(TitleBase)`
  ${tw`          
      text-black-base
  `};
`;

const XsmallButton = styled(Button)`
    ${tw`
        text-xs
    `};
`;

export default function SuggestedProfile({
  profileDocId,
  profileUserId,
  username,
  handleFollowProfile
}) {
  const [followed, setFollowed] = useState(false);

  const handleFollow = async () => {
    setFollowed(true);

    handleFollowProfile(profileDocId, profileUserId);
  }

  return !followed ? (
    <SuggestionsLineWrapper>
      <SuggestionsProfileWrapper>
        <div>
          <Link to={`/p/${username}`}>
            <UserProfileRoundedImage username={username} maxWidth={ImageScales.md} />
          </Link>
        </div>
        <div>
          <Link to={`/p/${username}`}>
            <UserProfileTitle>{username}</UserProfileTitle>
          </Link>
        </div>
      </SuggestionsProfileWrapper>
      <div>     
        <XsmallButton theme={ButtonTheme.link} text="Follow" type="button"
          onClick={handleFollow} />
      </div>
    </SuggestionsLineWrapper>
  ) : null;
}

SuggestedProfile.propTypes = {
  profileDocId: PropTypes.string.isRequired,
  profileUserId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  handleFollowProfile: PropTypes.func.isRequired
};
