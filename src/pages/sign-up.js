// Hooks
import { useState, useContext, useEffect } from 'react';

import { Link, useHistory } from 'react-router-dom';

// Styles
import styled, { css } from "styled-components";
import tw from "twin.macro";

// Context
import FirebaseContext from '../context/firebase';
import UserContext from '../context/user';

// Contants
import { PAGE_ROUTES } from '../constants/routes';

// Services
import { doesUsernameExist } from '../services/users-service';

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

export default function SignUp() {
  const { firebase } = useContext(FirebaseContext);
  const { setUserData } = useContext(UserContext);

  const history = useHistory();

  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const isInvalid = password === '' || emailAddress === '' ||
    username === '' || fullName === '';

  const handleSignUp = async (event) => {
    event.preventDefault();

    const usernameExists = await doesUsernameExist(username);
    if (!usernameExists) {
      try {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(emailAddress, password);

        // authentication
        // -> emailAddress & password & username (displayName)
        await createdUserResult.user.updateProfile({
          displayName: username.toLowerCase()
        });

        const signUpUser = {
          userId: createdUserResult.user.uid,
          username: username.toLowerCase(),
          fullName,
          emailAddress: emailAddress.toLowerCase(),
          following: [],
          followers: [],
          dateCreated: Date.now()
        }

        // firebase to create sign up user collection (create a document) from signUpUser
        await firebase
          .firestore()
          .collection('users')
          .add(signUpUser)
          .then(function (docRef) {
            // set the new signed up user in the context  
            setUserData({ ...signUpUser, docId: docRef.id });

            // redirect to dashboard  
            history.push(PAGE_ROUTES.dashboard);
          });

      } catch (error) {
        setFullName('');
        setEmailAddress('');
        setPassword('');
        setError(error.message);
      }
    } else {
      setUsername('');
      setError('That username is already taken, please try another.');
    }
  };

  useEffect(() => {
    document.title = 'Sign Up - Instagram';
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

          <form onSubmit={handleSignUp} method="POST">
            <FormInput
              aria-label="Enter your username"
              type="text"
              autoComplete="username"
              placeholder="Username"
              onChange={({ target }) => setUsername(target.value)}
              value={username}
            />
            <FormInput
              aria-label="Enter your full name"
              type="text"
              autoComplete="username"
              placeholder="Full name"
              onChange={({ target }) => setFullName(target.value)}
              value={fullName}
            />
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
              autoComplete="new-password"
              placeholder="Password"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
            />
            <FormButton
              disabled={isInvalid}
              type="submit"
              isInvalid={isInvalid}
            >
              Sign Up
            </FormButton>
          </form>
        </TopSectionFormWrapper>
        <BottomSectionFormWrapper>
          <BottomSectionFormText>
            Have an account?{` `}
            <Link to={PAGE_ROUTES.login}>
              Login
            </Link>
          </BottomSectionFormText>
        </BottomSectionFormWrapper>
      </FormWrapper>
    </ContentWrapper>
  );
}
