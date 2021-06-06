import { useContext, useEffect } from "react";
import Header from "../components/header";
import Timeline from "../components/timeline";
import Sidebar from "../components/sidebar";
import UserContext from '../context/user';

export default function Dashboard() {
    const { userDoc: loggedInUser } = useContext(UserContext);
    
    // unconditional side effect after each render for dashboard component
    useEffect(() => {
        // set the page title
        document.title = 'Instagram';
    });
    
    return (
        <div className="bg-gray-background">
            <Header />
            <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
                <Timeline loggedInUserId={loggedInUser?.userId} loggedInUserFollowing={loggedInUser?.following} />
                <Sidebar loggedInUser={loggedInUser || {}} />
            </div>
        </div>
    );
}