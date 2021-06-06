/* eslint-disable jsx-a11y/img-redundant-alt */
import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import { isUserFollowingProfile } from '../../services/firebase';
import { handleToggleFollowAction } from '../../services/global-app-actions';
import { DEFAULT_IMAGE_PATH } from '../../constants/paths';
import UserContext from '../../context/user';

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
        <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
            <div className="container flex justify-center items-center">
                {profileUsername ? (
                    <img
                        className="rounded-full h-40 w-40 flex"
                        alt={`${fullName} profile picture`}
                        src={`/images/avatars/${profileUsername}.jpg`}
                        onError={(e) => {
                            e.target.src = DEFAULT_IMAGE_PATH;
                        }}
                    />
                ) : (
                    <Skeleton circle height={150} width={150} count={1} />
                )}
            </div>
            <div className="flex items-center justify-center flex-col col-span-2">
                <div className="container flex items-center">
                    <p className="text-2xl mr-4">{profileUsername}</p>
                    {activeBtnFollow && isFollowingProfile === null ? (
                        <Skeleton count={1} width={80} height={32} />
                    ) : (
                        activeBtnFollow && (
                            <button
                                className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
                                type="button"
                                onClick={handleToggleFollow}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') {
                                        handleToggleFollow();
                                    }
                                }}
                            >
                                {isFollowingProfile ? 'Unfollow' : 'Follow'}
                            </button>
                        )
                    )}
                </div>
                <div className="container flex mt-4">
                    {!followers || !following ? (
                        <Skeleton count={1} width={677} height={24} />
                    ) : (
                        <>
                            <p className="mr-10">
                                <span className="font-bold">{photosCount}</span> photos
                                </p>
                            <p className="mr-10">
                                <span className="font-bold">{followerCount}</span>
                                {` `}
                                {followerCount === 1 ? `follower` : `followers`}
                            </p>
                            <p className="mr-10">
                                <span className="font-bold">{following?.length}</span> following
                                </p>
                        </>
                    )}
                </div>
                <div className="container mt-4">
                    <p className="font-medium">{!fullName ? <Skeleton count={1} height={24} /> : fullName}</p>
                </div>
            </div>
        </div>
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
