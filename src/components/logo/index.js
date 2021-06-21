import { Link } from 'react-router-dom';

// Styles
import styled from "styled-components";
import tw from "twin.macro";

// Contants
import { PAGE_ROUTES } from '../../constants/routes';

import InstagramLogo from '../../assets/images/logo.png';

const LogoWrapper = styled.div`
  ${tw`         
    flex 
    items-center 
    cursor-pointer
    w-full
  `};
`;

const Image = styled.div`
  width: auto;
  ${tw`h-6 md:h-9`};

  img {
    width: auto;
    height: 100%;
  }
`;

export default function Logo() {

    return (
        <LogoWrapper>
            <Image> 
                <Link to={PAGE_ROUTES.dashboard} aria-label="Instagram logo">
                    <img src={InstagramLogo} alt="Instagram" />
                </Link>
            </Image>
        </LogoWrapper>
    );
}