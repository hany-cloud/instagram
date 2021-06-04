import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getUserByUsername } from '../services/firebase';
import * as ROUTES from '../constants/routes';
import Header from '../components/header';
import UserProfile from '../components/profile';

export default function Profile() {
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

    }, [usernameParam, history]);

    return user ? (
        <div className="bg-gray-background">
            <Header />
            <div className="mx-auto max-w-screen-lg">
                <UserProfile user={user} />
            </div>
        </div>
    ) : null;
}