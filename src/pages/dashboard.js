import { useState, useContext, useEffect } from "react";
import Skeleton from 'react-loading-skeleton';
import Header from "../components/header";
import Timeline from "../components/timeline";
import Sidebar from "../components/sidebar";
import UserContext from '../context/user';
import { getFollowedUsersPhotosForUser, getUserByUserId } from '../services/firebase';

export default function Dashboard(props) {
    const { authUser, userDoc } = useContext(UserContext);
    const [loggedInUser, setLoggedInUser] = useState(userDoc);
    const [photos, setPhotos] = useState(null);

    const setTimelinePhotosInState = async () => {
        // does the user actually follow people?
        if (loggedInUser?.following?.length > 0) {
            const followedUserPhotos = await getFollowedUsersPhotosForUser(loggedInUser.userId, loggedInUser.following);
            // re-arrange array to be newest photos first by dateCreated                                                
            // followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated); // doing an ascending sort if the dateCreated is a Date object
            followedUserPhotos.sort((a, b) => a.dateCreated - b.dateCreated); // since the dateCreated value is a number and the earlier dates got a smaller numbers, we need to do a descending sort
            
            // Timeline component will render 
            setPhotos(followedUserPhotos);
        }
    }

    // unconditional side effect after each render to set the page title 
    useEffect(() => {
        document.title = 'Instagram';
    });
    
    useEffect(() => {
        // set logged in user in state if it is not exist (after sign up) 
        async function setUserInState(userId) {
            if(!loggedInUser || !loggedInUser?.userId) {
                const [user] = await getUserByUserId(userId);  
            
                // Sidebar component will render 
                setLoggedInUser(user);
            }            
        }

        if (authUser?.uid) {
            setUserInState(authUser?.uid); // this will makes Sidebar component to re-render
        }
    }, [props, authUser?.uid]);

    useEffect(() => {
        setTimelinePhotosInState(); // this will makes Timeline component to re-render
    }, [authUser?.uid, loggedInUser?.userId]);

    return (
        <div className="bg-gray-background">
            <Header />
            <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
                <div className="container col-span-2">
                    {!photos ? (
                        <Skeleton count={4} width={640} height={500} className="mb-5" />
                    ) : (
                        <Timeline photos={photos} />
                    )}
                </div>
                <Sidebar loggedInUser={loggedInUser|| {}} setTimelinePhotos={setTimelinePhotosInState} />
            </div>
        </div>
    );
}