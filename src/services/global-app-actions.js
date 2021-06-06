import {
    updateFollowingForUser,
    updateFollowersForUser
} from '../services/firebase';

// Handle the follow/unfollow action globally
//  byUserId: the logged in user id   
//  targetUser: the user that logged in user requests to follow/unfollow
//  isFollowAction: if true means apply unfollow action 
//                 else apply follow action
export async function handleToggleFollowAction(
    byUserDocId, byUserId, byUserFollowingArray, setUserFollowing, 
    targetUserDocId, targetUserId, isUnFollowAction) {
    // updating the following array for the logged in user in the context.
    const updatedFollowingArray = isUnFollowAction ?
            byUserFollowingArray.filter(item => item !== targetUserId) :
            [...byUserFollowingArray, targetUserId];
            setUserFollowing(updatedFollowingArray);

    // update the following array for logged in user (auth user) in backend firestore 
    await updateFollowingForUser(byUserDocId, targetUserId, isUnFollowAction);

    // update the follower array for the requested user that need to be followed or unfollowed by logged user (auth user)     
    await updateFollowersForUser(targetUserDocId, byUserId, isUnFollowAction);
}