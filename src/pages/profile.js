import { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getUserByUsername, getUserByUserId } from '../services/firebase';
import * as ROUTES from '../constants/routes';
import Header from '../components/header';
import UserProfile from '../components/profile';
import UserContext from '../context/user';

export default function Profile() {
    const { authUser, userDoc } = useContext(UserContext);
    const [loggedInUser, setLoggedInUser] = useState(userDoc);

    const { username: usernameParam } = useParams();
    const [user, setUser] = useState(null);
    const history = useHistory();

    useEffect(() => {
        // check the requested profile is exist
        const checkUserExists = async () => {
            const [userRec] = await getUserByUsername(usernameParam);
            if (userRec?.userId) {
                setUser(userRec);
            } else {
                history.push(ROUTES.NOT_FOUND); 
            }
        }

        checkUserExists();

        // set logged in user in state if it is not exist (after sign up) 
        async function setUserInState(userId) {
            if(!loggedInUser || !loggedInUser?.userId) {
                const [user] = await getUserByUserId(userId);  
            
                // UserProfile component will render 
                setLoggedInUser(user);
            }            
        }

        if (authUser?.uid) {
            setUserInState(authUser?.uid); // this will makes Sidebar component to re-render
        }

    }, [usernameParam, history]);

    //return user?.username ? (
    return user ? (
        <div className="bg-gray-background">
            <Header />
            <div className="mx-auto max-w-screen-lg">
                <UserProfile user={user} loggedInUser={loggedInUser || {}} />
            </div>
        </div>
    ) : null;
}