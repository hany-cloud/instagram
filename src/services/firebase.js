import { firebase, FieldValue } from '../lib/firebase';

const PAGE_SIZE = 4;

export async function doesUsernameExist(username) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  return result.docs.length > 0;
}

export async function getUserByUsername(username) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));
}

// get user from the firestore where userId === userId (passed from the auth)
export async function getUserByUserId(userId) {
  const result = await firebase.firestore().collection('users').where('userId', '==', userId).get();
  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));

  return user;
}

// update the following array for logged in user (auth user) 
export async function updateFollowingForUser(
  forUserDocId, // current logged in user document id
  targetUserId, // the user that logged in user requests to follow/unfollow
  isUserAlreadyFollowed // true/false (am i currently following this person?)
) {
  return firebase
    .firestore()
    .collection('users')
    .doc(forUserDocId)
    .update({
      following: isUserAlreadyFollowed
        ? FieldValue.arrayRemove(targetUserId) // un-follow
        : FieldValue.arrayUnion(targetUserId) // follow
    });

  // return firebase
  //     .firestore()
  //     .collection("users")
  //     .where("userId", "==", forUserId)
  //     .get()
  //     .then(querySnapshot => {
  //         querySnapshot.forEach(doc => {
  //             doc.ref.update({
  //                   following: isUserAlreadyFollowed
  //                     ? FieldValue.arrayRemove(targetUserId) // un-follow
  //                     : FieldValue.arrayUnion(targetUserId) // follow
  //             })
  //         });
  //   });
}

// update the follower array for the requested user that need to be followed or unfollowed by logged user (auth user) 
export async function updateFollowersForUser(
  forUserDocId, // the user that logged in user requests to follow/unfollow
  followerUserId, // current logged in user id (karl's profile)
  isUserAlreadyFollowed // true/false (am i currently following this person?)
) {
  return firebase
    .firestore()
    .collection('users')
    .doc(forUserDocId)
    .update({
      followers: isUserAlreadyFollowed
        ? FieldValue.arrayRemove(followerUserId) // un-follow
        : FieldValue.arrayUnion(followerUserId) // follow
    });
}

export async function getSuggestedProfilesForUser(forUserId, followedUserIds) {
  const MaxDisplayedSuggestCount = 10;
  let query = firebase.firestore().collection('users');

  // check all conditions before limit results
  if (followedUserIds?.length > 0) {
    query = query.where('userId', 'not-in', [...followedUserIds, forUserId]);
  } else {
    query = query.where('userId', '!=', forUserId);
  }
  const result = await query.limit(MaxDisplayedSuggestCount).get();

  const profiles = result.docs.map((user) => ({
    ...user.data(),
    docId: user.id
  }));

  return profiles;
}

export async function getFollowedUsersPhotosForUser(forUserId, followedUserIds) {
  // [5,4,2] => following
  // get the posted photos for the people who are in the following array
  const result = await firebase
    .firestore()
    .collection('photos')
    .where('userId', 'in', followedUserIds)
    .get();

  const userFollowedPhotos = result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id
  }));

  const photosWithUserDetails = await Promise.all(
    userFollowedPhotos.map(async (photo) => {
      // let userLikedPhoto = false;
      // if (photo.likes.includes(userId)) {
      //   userLikedPhoto = true;
      // }
      let userLikedPhoto = photo.likes.includes(forUserId) ? true : false;

      // photo.userId = 2
      // get the user detail who post the current photo
      const user = await getUserByUserId(photo.userId);
      // raphael
      const { username } = user[0];
      return { username, ...photo, userLikedPhoto };
    })
  );

  return photosWithUserDetails;
}

export async function getFollowedUsersPhotosForUserByPage(forUserId, followedUserIds, latestDoc) {
  // [5,4,2] => following
  // get the posted photos for the people who are in the following array
  const result = await firebase
    .firestore()
    .collection('photos')
    .where('userId', 'in', followedUserIds)
    .orderBy('dateCreated')
    .startAfter(latestDoc || 0)
    .limit(PAGE_SIZE)
    .get();

  if(result.empty) {
    return { photosWithUserDetails: {}, latestFetchedDoc: 0,  empty: true }; 
  }

  const latestFetchedDoc = result.docs[result.docs.length - 1];
  const userFollowedPhotos = result.docs.map((photo) => ({
    ...photo.data(),    
    docId: photo.id
  }));

  const photosWithUserDetails = await Promise.all(
    userFollowedPhotos.map(async (photo) => {
      let userLikedPhoto = photo.likes.includes(forUserId) ? true : false;

      // get the user detail who post the current photo
      const user = await getUserByUserId(photo.userId);      
      const { username } = user[0];
      return { username, ...photo, userLikedPhoto };
    })
  );

  return { photosWithUserDetails, latestFetchedDoc,  empty: false };
}

export async function getUserPhotosByUserId(userId) {
  const result = await firebase
    .firestore()
    .collection('photos')
    .where('userId', '==', userId)
    .get();

  const photos = result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id
  }));
  return photos;
}

export async function isUserFollowingProfile(userId, profileUserId) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('userId', '==', userId)
    .where('following', 'array-contains', profileUserId)
    .limit(1)
    .get();

  const [response = {}] = result.docs.map((item) => ({
    ...item.data()
  }));

  return response.userId;
}