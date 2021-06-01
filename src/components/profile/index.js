import { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import Photos from './photos';
import { getUserPhotosByUserId } from '../../services/firebase';

export default function Profile({ user, loggedInUser }) {
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
        <>
            {/* <Header
                photosCount={photosCollection ? photosCollection.length : 0}
                profile={profile}
                followerCount={followerCount}
                setFollowerCount={dispatch}
            /> */}
            <Header
                photosCount={photosCollection ? photosCollection.length : 0}
                followerCount={followerCount}
                setFollowerCount={setFollowerCount}
                profile={profile} 
                loggedInUser={loggedInUser}               
            />
            <Photos photos={photosCollection} />
        </>
    );
}

Profile.propTypes = {
    loggedInUser: PropTypes.object,
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
