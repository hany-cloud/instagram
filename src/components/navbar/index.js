import { useContext } from 'react';
import { Link } from 'react-router-dom';

// Styles
import styled from "styled-components";
import tw from "twin.macro";

// Context
import UserContext from '../../context/user';

// Contants
import { PAGE_ROUTES } from '../../constants/routes';

// Components
import Logo from "../../components/logo";
import NavItems from './navItems';
import Button, { ButtonTheme } from '../button';

const NavbarWrapper = styled.div`
    ${tw`            
        h-14        
        bg-white 
        border-b 
        border-gray-primary         
        mb-8
        p-3        
        flex 
        justify-between 
        h-full    
        text-center    
    `}
`;

export default function Navbar() {
    const { authUser } = useContext(UserContext);
    
    return (
        <NavbarWrapper>            
            <Logo />
            {authUser ? (
                <NavItems />
            ) : (
                <>
                    <Link to={PAGE_ROUTES.login}>
                        <Button theme={ButtonTheme.filled} text="Log In" />
                    </Link>
                    <Link to={PAGE_ROUTES.sign_up}>
                        <Button theme={ButtonTheme.link} text="Sign Up" />
                    </Link>
                </>
            )}
        </NavbarWrapper>
    );
}