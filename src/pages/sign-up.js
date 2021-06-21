// Hooks
import { useState, useContext, useEffect } from 'react';

import { Link, useHistory } from 'react-router-dom';

// Context
import FirebaseContext from '../context/firebase';
import UserContext from '../context/user';

// Contants
import { PAGE_ROUTES } from '../constants/routes';

// Services
import { doesUsernameExist } from '../services/users-service';

// Components
import { ButtonTheme } from "../components/button";
import { ContentWrapper, 
    SideImageWrapper,
    FormWrapper,
    TopSectionFormWrapper,
    TopSectionFormImage,
    BottomSectionFormWrapper,
    BottomSectionFormText,
    FormError,
    FormInput,
    FormButton} from "./forms.styles";

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
              theme={ButtonTheme.filled}
                            text="Sign Up"
            />
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
