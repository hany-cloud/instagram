import PropTypes from 'prop-types';

import styled from "styled-components";
import tw from "twin.macro";

export const ImageScales = {
    sm: "2rem",
    md: "4rem",
    lg: "10rem"
};

const ImageWrapper = styled.div`   
    max-width: ${props => props.maxWidth};
    ${tw` 
        p-1                  
    `}
`;

const Image = styled.img`    
    ${tw`            
        rounded-full         
    `}
`;

export function UserProfileRoundedImage({ username, maxWidth }) {
    const DEFAULT_IMAGE_PATH = '/images/avatars/default.png';

    return (
        <ImageWrapper maxWidth={maxWidth}>
            <Image
                src={`/images/avatars/${username}.jpg`}
                alt={`${username} profile`}
                onError={(e) => {
                    e.target.src = DEFAULT_IMAGE_PATH;
                }}
            />
        </ImageWrapper>
    );
}

UserProfileRoundedImage.propTypes = {
    username: PropTypes.string
};