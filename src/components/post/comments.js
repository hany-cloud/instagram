import { useState } from 'react';
import PropTypes from 'prop-types';
import { formatDistance } from 'date-fns';
import { Link } from 'react-router-dom';
import AddComment from './add-comment';

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
            <div className="p-4 pt-1 pb-4">
                {comments.slice(0, commentsSlice).map((item) => (
                    <p key={`${item.comment}-${item.displayName}`} className="mb-1">
                        <Link to={`/p/${item.displayName}`}>
                            <span className="mr-1 font-bold">{item.displayName}</span>
                        </Link>
                        <span>{item.comment}</span>
                    </p>
                ))}
                {comments.length >= DISPLAYED_COMMENTS_LENGTH && commentsSlice < comments.length && (
                    <button
                        className="text-sm text-gray-base mb-1 cursor-pointer focus:outline-none"
                        type="button"
                        onClick={showNextComments}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                showNextComments();
                            }
                        }}
                    >
                        View more comments
                    </button>
                )}
                <p className="text-gray-base uppercase text-xs mt-2">
                    {formatDistance(posted, new Date())} ago
                </p>
            </div>
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
