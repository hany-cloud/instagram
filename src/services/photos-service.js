import { firebase, PAGE_SIZE } from '../config/firebase-config';

// Services
import { getUserByUserId } from '../services/users-service';

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

    if (result.empty) {
        return { photosWithUserDetails: {}, latestFetchedDoc: 0, empty: true };
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

    return { photosWithUserDetails, latestFetchedDoc, empty: false };
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