/* eslint-disable no-nested-ternary */
import Skeleton from 'react-loading-skeleton';

import PropTypes from 'prop-types';

// Styles
import styled from "styled-components";
import tw from "twin.macro";

const ProfilePhotosWrapper = styled.div` 
    ${tw`
        h-16 
        border-t border-gray-primary 
        mt-12 
        pt-4
    `};
`;

const PhotosWrapper = styled.div` 
    ${tw`
        grid 
        grid-cols-3 
        gap-8 
        
        mt-4 
        mb-12 
    `};
`;

const Photo = styled.div` 
    ${tw`
        relative         
    `};
`;

const PhotoStatusHoverSection = styled.div` 
    ${tw`
        absolute 
        bottom-0 
        left-0 
        bg-gray-base
        z-10 
        w-full 
        justify-evenly 
        items-center 
        h-full 
        bg-black-faded 
        group-hover:flex 
        hidden
    `};
`;

const PhotoStatusItem = styled.p` 
    ${tw`
        flex 
        items-center 
        text-white 
        
        font-bold 
    `};
`;


export default function Photos({ photos }) {
    return (
        <ProfilePhotosWrapper>
            <PhotosWrapper>
                {!photos
                    ? new Array(12).fill(0).map((_, i) => <Skeleton key={i} width={320} height={400} />)
                    //? <Skeleton count={12} width={320} height={400} />
                    : photos.length > 0
                        ? photos.map((photo) => (
                            <Photo key={photo.docId} className="group">
                                <img src={photo.imageSrc} alt={photo.caption} />

                                <PhotoStatusHoverSection>
                                    <PhotoStatusItem>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            className="w-8 mr-4"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        {photo.likes.length}
                                    </PhotoStatusItem>

                                    <PhotoStatusItem>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            className="w-8 mr-4"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        {photo.comments.length}
                                    </PhotoStatusItem>
                                </PhotoStatusHoverSection>
                            </Photo>
                        ))
                        : null}
            </PhotosWrapper>

            {!photos || (photos.length === 0 && <p className="text-center text-2xl">No Posts Yet</p>)}
        </ProfilePhotosWrapper>
    );
}

Photos.propTypes = {
    photos: PropTypes.array
};
