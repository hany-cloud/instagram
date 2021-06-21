/* eslint-disable jsx-a11y/img-redundant-alt */
import { useState, useEffect, useContext } from 'react';
import Skeleton from 'react-loading-skeleton';

import PropTypes from 'prop-types';

// Styles
import styled from "styled-components";
import tw from "twin.macro";

// Contexts
import UserContext from '../../context/user';

// Services
import { isUserFollowingProfile } from '../../services/users-service';
import { handleToggleFollowAction } from '../../services/global-app-actions';

// Components
import { UserProfileRoundedImage, ImageScales } from '../userProfileRoundedImage';
import Button, { ButtonTheme } from '../button';


const HeaderWrapper = styled.div` 
    ${tw`
        container
        grid 
        grid-cols-2 md:grid-cols-3 
        justify-items-center
        place-content-center
    `};
`;

const HeaderInfoWrapper = styled.div` 
    ${tw`
        flex         
        items-center 
        justify-center 
        flex-col 
        col-span-2  
        p-3  
    `};
`;

const InfoFollowToggleWrapper = styled.div` 
    ${tw`
        container 
        flex  
        flex-wrap       
        items-center  
    `};

    & > p {
        ${tw`
            text-lg
            md: text-2xl 
            mr-4
        `};
      }
`;

const InfoUserActivityWrapper = styled.div` 
    ${tw`
        container 
        flex 
        flex-wrap
        mt-4
    `};

    & > p {
        ${tw`
            mr-10
        `};
      }

      & > p > span {
        ${tw`
            font-bold
        `};
      }  
`;

const InfoUserfullNameWrapper = styled.div` 
    ${tw`
        container 
        mt-4
    `};
    
    & > p {
        ${tw`
            font-medium
        `};
      }  
`;

export default function Header({
    photosCount,
    followerCount,
    setFollowerCount,
    profile: {
        docId: profileDocId,
        userId: profileUserId,
        fullName,
        followers,
        following,
        username: profileUsername
    }
}) {

    const { userDoc: loggedInUser, setUserFollowing } = useContext(UserContext);

    const [isFollowingProfile, setIsFollowingProfile] = useState(null);

    const activeBtnFollow = loggedInUser?.userId && loggedInUser?.userId !== profileUserId;

    const handleToggleFollow = async () => {
        setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);

        setFollowerCount(isFollowingProfile ? followerCount - 1 : followerCount + 1);

        // Reflecting the changes to the following array of the user in the context scope, 
        // so that both suggestions component and timeline component will be re-rendered  
        handleToggleFollowAction(
            loggedInUser.docId, loggedInUser.userId, loggedInUser.following, setUserFollowing, 
            profileDocId, profileUserId, isFollowingProfile);
    };

    useEffect(() => {
        const checkLoggedInUserFollowingProfile = async () => {
            if (loggedInUser?.userId && profileUserId) {
                const isFollowing = await isUserFollowingProfile(loggedInUser.userId, profileUserId);
                setIsFollowingProfile(!!isFollowing); // double NOT operator: to convert a non-boolean value to a boolean value
            }
        };

        checkLoggedInUserFollowingProfile();
    }, [profileUserId, loggedInUser?.userId]);

    return (
        <HeaderWrapper>
            <>
                {profileUsername ? (                   
                    <UserProfileRoundedImage username={profileUsername} maxWidth={ImageScales.lg} />
                ) : (
                    <Skeleton circle height={150} width={150} count={1} />
                )}
            </>
            <HeaderInfoWrapper>
                <InfoFollowToggleWrapper>
                    <p>{profileUsername}</p>
                    {activeBtnFollow && isFollowingProfile === null ? (
                        <Skeleton count={1} width={80} height={32} />
                    ) : (
                        activeBtnFollow && (                           
                            <Button theme={ButtonTheme.filled} 
                                type="button"
                                text={isFollowingProfile ? 'Unfollow' : 'Follow'} 
                                onClick={handleToggleFollow}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') {
                                        handleToggleFollow();
                                    }
                                }}
                            />
                        )
                    )}
                </InfoFollowToggleWrapper>
                <InfoUserActivityWrapper>
                    {!followers || !following ? (
                        <Skeleton count={1} width={677} height={24} />
                    ) : (
                        <>
                            <p>
                                <span>{photosCount}</span> photos
                            </p>
                            <p>
                                <span>{followerCount}</span>
                                {` `}
                                {followerCount === 1 ? `follower` : `followers`}
                            </p>
                            <p>
                                <span>{following?.length}</span> following
                            </p>
                        </>
                    )}
                </InfoUserActivityWrapper>
                <InfoUserfullNameWrapper>
                    <p>{!fullName ? <Skeleton count={1} height={24} /> : fullName}</p>
                </InfoUserfullNameWrapper>
            </HeaderInfoWrapper>
        </HeaderWrapper>
    );
}

Header.propTypes = {
    photosCount: PropTypes.number.isRequired,
    followerCount: PropTypes.number.isRequired,
    setFollowerCount: PropTypes.func.isRequired,
    profile: PropTypes.shape({
        docId: PropTypes.string,
        userId: PropTypes.string,
        fullName: PropTypes.string,
        username: PropTypes.string,
        followers: PropTypes.array,
        following: PropTypes.array
    }).isRequired
};
