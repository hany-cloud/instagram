import { useState, useEffect, useContext } from 'react';
import Skeleton from 'react-loading-skeleton';

import PropTypes from 'prop-types';

// Styles
import styled from "styled-components";
import tw from "twin.macro";

// Contexts
import UserContext from '../../context/user';

// Services
import { getSuggestedProfilesForUser } from '../../services/users-service';
import { handleToggleFollowAction } from '../../services/global-app-actions';

// Components
import SuggestedProfile from './suggested-profile';
import { TitleBase } from './suggestions.styles';

const SuggestionsWrapper = styled.div`
    ${tw`          
        grid 
        gap-4 md:gap-5
    `};
`;

const SuggestionsTitle = styled(TitleBase)`
    ${tw`          
        text-gray-base
    `};
`;

export default function Suggestions({ loggedInUserDocId, loggedInUserId, loggedInUserFollowing }) {
    const { setUserFollowing } = useContext(UserContext);
    const [profiles, setProfiles] = useState(null);

    const handleFollowProfile = async (followProfileDocId, followProfileUserId) => {
        const isUnFollowAction = false;
        handleToggleFollowAction(
            loggedInUserDocId, loggedInUserId, loggedInUserFollowing, setUserFollowing,
            followProfileDocId, followProfileUserId, isUnFollowAction);
    };

    useEffect(() => {
        const setSuggestedProfilesInState = async () => {
            if (loggedInUserId) {
                const response = await getSuggestedProfilesForUser(loggedInUserId, loggedInUserFollowing); // from firestore
                setProfiles(response);
            }
        }

        setSuggestedProfilesInState();
    }, [loggedInUserId, loggedInUserFollowing]);

    return !profiles ? (
        <Skeleton count={1} height={150} className="mt-5" /> //(wait on the profiles as in 'skeleton')
    ) : profiles.length > 0 ? (
        <SuggestionsWrapper>
            <SuggestionsTitle>Suggestions for you</SuggestionsTitle>
            {profiles.map((profile) => (
                <SuggestedProfile
                    key={profile.docId}
                    profileDocId={profile.docId}
                    profileUserId={profile.userId}
                    username={profile.username}
                    handleFollowProfile={handleFollowProfile}
                />
            ))}
        </SuggestionsWrapper>
    ) : null;
}

Suggestions.propTypes = {
    loggedInUserDocId: PropTypes.string,
    loggedInUserId: PropTypes.string,
    loggedInUserFollowing: PropTypes.array
};