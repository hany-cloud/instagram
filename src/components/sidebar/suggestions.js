import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import { getSuggestedProfilesForUser } from '../../services/firebase';
import { handleToggleFollowAction } from '../../services/global-app-actions';
import SuggestedProfile from './suggested-profile';
import UserContext from '../../context/user';

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
        <div className="rounded flex flex-col">
            <div className="text-sm flex items-center align-items justify-between mb-2">
                <p className="font-bold text-gray-base">Suggestions for you</p>
            </div>
            <div className="mt-4 grid gap-5">
                {profiles.map((profile) => (
                    <SuggestedProfile
                        key={profile.docId}
                        profileDocId={profile.docId}
                        profileUserId={profile.userId}
                        username={profile.username}
                        handleFollowProfile={handleFollowProfile}
                    />
                ))}
            </div>
        </div>
    ) : null;
}

Suggestions.propTypes = {
    loggedInUserDocId: PropTypes.string,
    loggedInUserId: PropTypes.string,
    loggedInUserFollowing: PropTypes.array
};