// Hooks
import { useContext, useEffect, useState } from "react";

import { Link, useHistory } from "react-router-dom";

// Styles
import styled, { css } from "styled-components";
import tw from "twin.macro";

// Context
import FirebaseContext from "../context/firebase";

// Contants
import { PAGE_ROUTES } from '../constants/routes';

const ContentWrapper = styled.div`
    ${tw` 
        flex 
        items-center 
        justify-center  
        content-center
            
        mx-auto  

        pr-3

        max-w-screen-md 
        h-screen    
    `}
`;

const SideImageWrapper = styled.div`
    ${tw` 
        w-3/5       
    `}
`;

const FormWrapper = styled.div`
    ${tw` 
        w-2/5     
    `}
`;

const SectionFormWrapper = styled.div`
    ${tw`    
        flex 

        flex-col
        items-center 
        justify-center 
        
        w-full 
        
        bg-white 
        
        p-4 
        
        border border-gray-primary  

        rounded 
        
        mb-4
    `}
`;
const TopSectionFormWrapper = styled(SectionFormWrapper)``;
const TopSectionFormImage = styled.div`
    ${tw`    
        flex 
        justify-center 
        w-full
    `}

    & > img {
        ${tw`
            mt-2
            w-6/12 
            mb-4
        `};
      }
`;

const BottomSectionFormWrapper = styled(SectionFormWrapper)``;

const BottomSectionFormText = styled.p`
    ${tw`    
        text-sm
    `}

    & > a {
        ${tw`    
            font-bold 
            text-blue-medium
        `}  
    }
`;
  

const FormError = styled.p`
    ${tw`    
        mb-4 
        text-xs 
        text-red-primary
    `}    
`;

const FormInput = styled.input`
    ${tw`    
        text-sm 
        text-gray-base 

        w-full 

        mr-3 
        mb-2

        py-5 
        px-4 

        h-2 
        border border-gray-primary 
        rounded         
    `}
`;

const FormButton = styled.button`
    ${tw`    
        bg-blue-medium 
        text-white 
        w-full 
        rounded 
        h-8 
        font-bold         
    `};

    ${({ isInvalid }) =>
        isInvalid &&
        css`
        ${tw`
            opacity-50
        `};
    `};
`;

export default function Login() {
    const history = useHistory();
    const { firebase } = useContext(FirebaseContext);

    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const isInvalid = emailAddress === '' || password === '';

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
            history.push(PAGE_ROUTES.dashboard);
        } catch (error) {
            setEmailAddress('');
            setPassword('');
            setError(error.message);
        }
    };

    useEffect(() => {
        // set the page title
        document.title = 'Login - Instagram';
    }, []);

    return (
        <ContentWrapper>
            <SideImageWrapper>
                <img src="/images/iphone-with-profile.jpg" alt="iPhone with Instagram app" />
            </SideImageWrapper>
            <FormWrapper>
                <TopSectionFormWrapper>
                    <TopSectionFormImage>
                        <img src="/images/logo.png" alt="Instagram" />
                    </TopSectionFormImage>

                    {error && <FormError>{error}</FormError>}

                    <form onSubmit={handleLogin} method="POST">
                        <FormInput
                            aria-label="Enter your email address"
                            type="text"
                            autoComplete="username"
                            placeholder="Email address"                            
                            onChange={({ target }) => setEmailAddress(target.value)}
                            value={emailAddress}
                        />
                        <FormInput
                            aria-label="Enter your password"
                            type="password"
                            autoComplete="current-password"
                            placeholder="Password"                           
                            onChange={({ target }) => setPassword(target.value)}
                            value={password}
                        />
                        <FormButton
                            disabled={isInvalid}
                            type="submit"
                            isInvalid={isInvalid}
                        >
                            Login
                        </FormButton>
                    </form>
                </TopSectionFormWrapper>
                <BottomSectionFormWrapper>
                    <BottomSectionFormText>
                        Don't have an account?{` `}
                        <Link to={PAGE_ROUTES.sign_up}>
                            Sign up
                        </Link>
                    </BottomSectionFormText>
                </BottomSectionFormWrapper>
            </FormWrapper>
        </ContentWrapper>
    );
}