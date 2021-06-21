// Hooks
import { useState, useContext } from 'react';

import PropTypes from 'prop-types';

// Styles
import styled, { css } from "styled-components";
import tw from "twin.macro";

// Context
import FirebaseContext from '../../context/firebase';
import UserContext from '../../context/user';

const ActionsWrapper = styled.div`
    ${tw` 
        flex 
        p-4    
    `}
`;

const ActionsIcon = styled.svg`
    ${tw` 
        w-8          
        select-none 
        cursor-pointer 
        focus:outline-none
        text-black-light
    `}
`;
const ToggleLikedIcon = styled(ActionsIcon)`
    ${tw`         
        mr-4 
    `}

    ${({ toggleLiked }) =>
    toggleLiked &&
        css`
        ${tw`
            fill-red 
            text-red-primary
        `};
    `};
`;

const WriteCommentIcon = styled(ActionsIcon)`
    ${tw` 
        w-8          
        select-none 
        cursor-pointer 
        focus:outline-none
        text-black-light
    `}
`;

const LikesCountText = styled.p`
    ${tw` 
        p-4 
        py-0 
        font-bold
    `}
`;

export default function Actions({ docId, totalLikes, likedPhoto, handleFocus }) {
    // const {
    //     authUser: { uid: userId }
    // } = useContext(UserContext);
    const { authUser } = useContext(UserContext);
    const userId = authUser?.uid;

    const [toggleLiked, setToggleLiked] = useState(likedPhoto);
    const [likes, setLikes] = useState(totalLikes);
    const { firebase, FieldValue } = useContext(FirebaseContext);

    const handleToggleLiked = async () => {
        setToggleLiked((toggleLiked) => !toggleLiked);

        await firebase
            .firestore()
            .collection('photos')
            .doc(docId)
            .update({
                likes: toggleLiked ? FieldValue.arrayRemove(userId) : FieldValue.arrayUnion(userId)
            });

        setLikes((likes) => (toggleLiked ? likes - 1 : likes + 1));
    };

    return (
        <>
            <ActionsWrapper>
                <ToggleLikedIcon
                    onClick={handleToggleLiked}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            handleToggleLiked();
                        }
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    tabIndex={0}
                    toggleLiked={toggleLiked}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                </ToggleLikedIcon>
                <WriteCommentIcon
                    onClick={handleFocus}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            handleFocus();
                        }
                    }}                    
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    tabIndex={0}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                </WriteCommentIcon>
            </ActionsWrapper>
            <LikesCountText>{likes === 1 ? `${likes} like` : `${likes} likes`}</LikesCountText>
        </>
    );
}

Actions.propTypes = {
    docId: PropTypes.string.isRequired,
    totalLikes: PropTypes.number.isRequired,
    likedPhoto: PropTypes.bool.isRequired,
    handleFocus: PropTypes.func.isRequired
};
