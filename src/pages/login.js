// Hooks
import { useContext, useEffect, useState } from "react";

import { Link, useHistory } from "react-router-dom";

// Context
import FirebaseContext from "../context/firebase";

// Contants
import { PAGE_ROUTES } from '../constants/routes';

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
                            theme={ButtonTheme.filled}
                            text="Login"
                        />                          
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