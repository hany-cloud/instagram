import { useReducer, useEffect } from 'react';

import PropTypes from 'prop-types';

// Styles
import styled from "styled-components";
import tw from "twin.macro";

// Services 
import { getUserPhotosByUserId } from '../../services/photos-service';

// Components
import Header from './header';
import Photos from './photos';

const ProfileWrapper = styled.div` 
    ${tw`
        mx-auto 
        max-w-screen-lg
    `};
`;

export default function Profile({ user }) {
    const reducer = (state, newState) => ({ ...state, ...newState });
    const initialState = {
        profile: {},
        photosCollection: null,
        followerCount: 0
    };

    const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
        reducer,
        initialState
    );

    const setFollowerCount = (count) => {
        dispatch({ followerCount: count });
    }

    useEffect(() => {
        const getProfileInfoAndPhotos = async () => {
            const photos = await getUserPhotosByUserId(user.userId);
            // re-arrange array to be newest photos first by dateCreated   
            photos.sort((a, b) => a.dateCreated - b.dateCreated);
            dispatch({ profile: user, photosCollection: photos, followerCount: user.followers.length });
        }

        getProfileInfoAndPhotos(); 
    }, [user.userId]);

    return (
        <ProfileWrapper>
            <Header
                photosCount={photosCollection ? photosCollection.length : 0}
                followerCount={followerCount}
                setFollowerCount={setFollowerCount}
                profile={profile}             
            />
            <Photos photos={photosCollection} />
        </ProfileWrapper>     
    );
}

Profile.propTypes = {
    user: PropTypes.shape({
        dateCreated: PropTypes.number,
        emailAddress: PropTypes.string,
        followers: PropTypes.array,
        following: PropTypes.array,
        fullName: PropTypes.string,
        userId: PropTypes.string,
        username: PropTypes.string
    })
};
