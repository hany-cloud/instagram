// Hooks
import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

// Services
import { getUserByUsername } from '../services/users-service';

// Contants
import { PAGE_ROUTES } from '../constants/routes';

// Components
import Navbar from "../components/navbar";
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
                history.push(PAGE_ROUTES.not_found); 
            }
        }

        checkUserExists();

    }, [usernameParam, history]);

    return user ? (
        <>
            <Navbar />
            <UserProfile user={user} />
        </>
    ) : null;
}