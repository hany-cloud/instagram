// Hooks
import { useState, useContext } from 'react';

import PropTypes from 'prop-types';

// Styles
import styled, { css } from "styled-components";
import tw from "twin.macro";

// Contexts
import FirebaseContext from '../../context/firebase';
import UserContext from '../../context/user';

const FormWrapper = styled.div`
    ${tw` 
        border-t  border-gray-primary     
    `}

    & > form {
        ${tw` 
            flex justify-between pl-0 pr-5
        `}
    }
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
    `}
`;

const FormButton = styled.button`
    ${tw`    
        text-sm 
        font-bold 
        text-blue-medium         
    `};

    ${({ comment }) =>
        !comment &&
        css`
        ${tw`
            opacity-25
        `};
    `};
`;

export default function AddComment({ docId, comments, setComments, commentInput }) {
    const [comment, setComment] = useState('');
    const { firebase, FieldValue } = useContext(FirebaseContext);
    
    const { authUser } = useContext(UserContext);
    const displayName = authUser?.displayName;

    const handleSubmitComment = (event) => { 
        event.preventDefault();
        if (comment.length >= 1) {
            setComments([...comments, { displayName, comment }]);
            setComment('');

            return firebase
                .firestore()
                .collection('photos')
                .doc(docId)
                .update({
                    comments: FieldValue.arrayUnion({ displayName, comment })
                });
        }
    };

    return (
        <FormWrapper>
            <form
                method="POST"
                // onSubmit={(event) =>
                //     comment.length >= 1 ? handleSubmitComment(event) : event.preventDefault()
                // }
                onSubmit={(event) => handleSubmitComment(event)}
            >
                <FormInput
                    aria-label="Add a comment"
                    autoComplete="off"
                    type="text"
                    name="add-comment"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={({ target }) => setComment(target.value)}
                    ref={commentInput}
                />
                <FormButton                    
                    type="submit"                
                    disabled={comment.length < 1}    
                    comment={comment}                
                >
                    Post
                </FormButton>
            </form>
        </FormWrapper>
    );
}

AddComment.propTypes = {
    docId: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    setComments: PropTypes.func.isRequired,
    commentInput: PropTypes.object
};
