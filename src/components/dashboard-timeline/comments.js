import { useState } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import { formatDistance } from 'date-fns';

// Styles
import styled from "styled-components";
import tw from "twin.macro";

// Components
import AddComment from './add-comment';

const CommentsWrapper = styled.div`
    ${tw` 
        p-4 
        pt-1 
        pb-4
    `}
`;

const CommentSection = styled.div`
    ${tw` 
        mb-1
    `}
`;

const CommentOwnerName = styled.p`
    ${tw` 
        mr-1 
        font-bold
    `}
`;

const Comment = styled.span``;

const PostCommentButton = styled.button`
    ${tw` 
        text-sm 
        text-gray-base 
        mb-1 
        cursor-pointer 
        focus:outline-none
    `}
`;

const PostCreationDate = styled.p`
    ${tw` 
        text-xs 
        text-gray-base 
        uppercase         
        mt-2
    `}
`;

export default function Comments({ docId, comments: allComments, posted, commentInput }) {
    const DISPLAYED_COMMENTS_LENGTH = 3;
    const [comments, setComments] = useState(allComments);
    const [commentsSlice, setCommentsSlice] = useState(DISPLAYED_COMMENTS_LENGTH);

    const showNextComments = () => {
        // show 3 more comments (if DISPLAYED_COMMENTS_LENGTH = 3)
        setCommentsSlice(commentsSlice + DISPLAYED_COMMENTS_LENGTH);
    };

    return (
        <>
            <CommentsWrapper>
                {comments.slice(0, commentsSlice).map((item) => (
                    <CommentSection key={`${item.comment}-${item.displayName}`}>
                        <Link to={`/p/${item.displayName}`}>
                            <CommentOwnerName>{item.displayName}</CommentOwnerName>
                        </Link>
                        <Comment>{item.comment}</Comment>
                    </CommentSection>
                ))}
                {comments.length >= DISPLAYED_COMMENTS_LENGTH && commentsSlice < comments.length && (
                    <PostCommentButton                        
                        type="button"
                        onClick={showNextComments}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                showNextComments();
                            }
                        }}
                    >
                        View more comments
                    </PostCommentButton>
                )}
                <PostCreationDate>
                    {formatDistance(posted, new Date())} ago
                </PostCreationDate>
            </CommentsWrapper>
            <AddComment
                docId={docId}
                comments={comments}
                setComments={setComments}
                commentInput={commentInput}
            />
        </>
    );
}

Comments.propTypes = {
    docId: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    posted: PropTypes.number.isRequired,
    commentInput: PropTypes.object.isRequired
};
