import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import { getSuggestedProfilesForUser } from '../../services/firebase';
import { handleToggleFollowAction } from '../../services/global-app-actions';
import SuggestedProfile from './suggested-profile';

export default function Suggestions({ loggedInUser, setTimelinePhotos }) {
    const [profiles, setProfiles] = useState(null);

    const handleFollowProfile = async (followProfileDocId, followProfileUserId) => {
        const isUnFollowAction = false;
        handleToggleFollowAction(loggedInUser, followProfileDocId, followProfileUserId, isUnFollowAction);

        setTimelinePhotos();
    }

    useEffect(() => {
        const setSuggestedProfilesInState = async () => {
            if (loggedInUser?.userId) {
                const response = await getSuggestedProfilesForUser(loggedInUser.userId, loggedInUser.following); // from firestore
                setProfiles(response);
            }
        }

        setSuggestedProfilesInState();
    }, [loggedInUser?.userId, loggedInUser?.following]);

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
    loggedInUser: PropTypes.object,
    setTimelinePhotos: PropTypes.func.isRequired
};