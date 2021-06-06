// import { useState, useEffect } from 'react';
// import { getFollowedUsersPhotosForUser } from '../services/firebase';

// export default function usePhotos(user) {
//     const [photos, setPhotos] = useState(null);

//     useEffect(() => {
//         const getTimelinePhotos = async () => {
//             // does the user actually follow people?
//             if (user?.following?.length > 0) {
//                 const followedUserPhotos = await getFollowedUsersPhotosForUser(user.userId, user.following);
//                 // re-arrange array to be newest photos first by dateCreated                                                
//                 // followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated); // doing an ascending sort if the dateCreated is a Date object
//                 followedUserPhotos.sort((a, b) => a.dateCreated - b.dateCreated); // since the dateCreated value is a number and the earlier dates got a smaller numbers, we need to do a descending sort
//                 setPhotos(followedUserPhotos);
//             }
//         }

//         getTimelinePhotos();
//     }, [user?.userId, user?.following]);

//     return { photos };
// }
