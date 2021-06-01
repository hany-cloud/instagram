import {
    updateFollowingForUser,
    updateFollowersForRequestedUser
} from '../services/firebase';

// Handle the follow/unfollow action globally
//  requestedUser the user that logged in user requests to follow/unfollow
//  isFollowAction: if true means apply Unfollow action 
//                 else apply follow action
export async function handleToggleFollowAction(loggedInUser, requestedUserDocId, requestedUserId, isUnFollowAction) {
    // updating the follwing array of logged in user in the context.
    loggedInUser.following = isUnFollowAction ?
        loggedInUser.following.filter(item => item !== requestedUserId) :
        [...loggedInUser.following, requestedUserId];
    
    // update the following array for logged in user (auth user) in backend firestore 
    await updateFollowingForUser(loggedInUser.docId, requestedUserId, isUnFollowAction);

    // update the follower array for the requested user that need to be followed or unfollowed by logged user (auth user)     
    await updateFollowersForRequestedUser(requestedUserDocId, loggedInUser.userId, isUnFollowAction);
}