// Hooks
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useMediaQuery } from "react-responsive";

// Styles
import { slide as Menu } from "react-burger-menu";
import styled, { css } from "styled-components";
import tw from "twin.macro";

// Slide Menu Style
import { menuStyles } from "./slide.menu.styles";

// Context
import FirebaseContext from '../../context/firebase';
import UserContext from '../../context/user';

// Contants
import { PAGE_ROUTES } from '../../constants/routes';
import { SCREENS } from "../../constants/css-responsive";

// Componenets
import HomeNavItem from './homeNavItem';
import SignoutNavItem from './signoutNavItem';
import UserProfileNavItem from './userProfileNavItem';
import Sidebar from '../suggestions-sidebar';

const ListContainer = styled.ul`
  ${tw`
    flex
    list-none  
  `};
`;

const NavItemWrapper = styled.li`
  ${tw`        
    md:text-base
    text-black-base
    text-sm
    font-medium
   
    cursor-pointer
    transition
    duration-300
    ease-in-out

    mr-2
    w-9
  `};
    
    ${({ menu }) =>
        menu &&
        css`
        ${tw`
            text-white            
            text-xl
            mb-2
        `};
    `};
`;

const SuggestionsWrapper = styled.div`
  height: 93%;
  display: flex;
    justify-content: center;
    align-items: center;
  ${tw`          
    rounded-lg
    bg-white
    w-full
    border-2
    border-blue-medium

    overflow-y-auto
  `};
`;

export default function NavItems() {
    const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });
    const { firebase } = useContext(FirebaseContext);
    const { authUser, userDoc: loggedInUser } = useContext(UserContext);
    const history = useHistory();

    const handleSignOut = async () => {
        try {
            await firebase.auth().signOut();
        } catch (error) {
            console.log('SignOut Error', error.message);
        }
        history.push(PAGE_ROUTES.login);
    }

    if (isMobile)
        return (
            <Menu right styles={menuStyles}>
                <ListContainer>
                    <NavItemWrapper menu>
                        <HomeNavItem />
                    </NavItemWrapper>
                    <NavItemWrapper menu>
                        <SignoutNavItem handleSignOut={handleSignOut} />
                    </NavItemWrapper>
                    <NavItemWrapper menu>
                        <UserProfileNavItem username={authUser?.displayName}/>
                    </NavItemWrapper>                                        
                </ListContainer>
                
                <SuggestionsWrapper>
                    <Sidebar loggedInUser={loggedInUser || {}}/>
                </SuggestionsWrapper>
            </Menu>
        );

    return (
        <ListContainer>
            <NavItemWrapper>
                <HomeNavItem />
            </NavItemWrapper>
            <NavItemWrapper>
                <SignoutNavItem handleSignOut={handleSignOut} />
            </NavItemWrapper>
            <NavItemWrapper>
                <UserProfileNavItem username={authUser?.displayName}/>
            </NavItemWrapper>
        </ListContainer>
    );
}