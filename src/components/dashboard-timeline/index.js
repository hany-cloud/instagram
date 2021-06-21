import { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import InfiniteScroll from 'react-infinite-scroll-component';

import PropTypes from 'prop-types';

// Styles
import styled from "styled-components";
import tw from "twin.macro";

// Services
import { getFollowedUsersPhotosForUserByPage } from '../../services/photos-service';

// Components
import Post from './post';

const TimeLineWrapper = styled.div`
    ${tw` 
        col-span-2
    `}
`;

// What TimeLine actually  need to do:
// - get logged in user's photos (hook -> use-photos)
// - in the meantime the photos are loaded, we need to use skeleton
// - if we have photos, render them (create post componenet)
// - if the user has no photos, tell him/her to create some photos (handle this case in the post componenet)
export default function Timeline({ loggedInUserId, loggedInUserFollowing }) {
    const [followedUserPhotos, setFollowedUserPhotos] = useState([]);

    const [displayedPhotos, setDisplayedPhotos] = useState([]);

    // setup the infinite scroll 
    const DISPLAYED_PHOTOS_LENGTH = 2;

    const [latestDoc, setLatestDoc] = useState(null);

    const [count, setCount] = useState({
        prev: 0,
        next: DISPLAYED_PHOTOS_LENGTH
    });

    const [hasMore, setHasMore] = useState(true);

    const showMorePhotos = async () => {
        if (displayedPhotos.length === followedUserPhotos?.length) {
            // show more data from database
            await loadPhotos();

            // no data fetched from database, means all photos are already displayed 
            if (displayedPhotos.length === followedUserPhotos?.length) {
                setHasMore(false);                
            }
        } else {
            // show more data from the local variable
            setDisplayedPhotos(displayedPhotos.concat(followedUserPhotos?.slice(count.prev + DISPLAYED_PHOTOS_LENGTH, count.next + DISPLAYED_PHOTOS_LENGTH)));
            setCount((prevState) => ({ prev: prevState.prev + DISPLAYED_PHOTOS_LENGTH, next: prevState.next + DISPLAYED_PHOTOS_LENGTH }))
        }
    }

    // load photos from backend database and update states with changed data. 
    const loadPhotos = async () => {        
        const { photosWithUserDetails: morePhotos, latestFetchedDoc, empty } =
            await getFollowedUsersPhotosForUserByPage(loggedInUserId, loggedInUserFollowing, latestDoc);
        
        setLatestDoc(latestFetchedDoc);

        // means there are data fetched from database
        if (!empty) {
            const allPhotos = [...followedUserPhotos, ...morePhotos];
            setFollowedUserPhotos(allPhotos);//((prev) => [...prev, ...morePhotos]);

            // means initial state at the compenent rendering
            if (displayedPhotos.length < 1) {
                setDisplayedPhotos(allPhotos.slice(count.prev, count.next));
            } else {
                const start = displayedPhotos.length;
                const end = start + DISPLAYED_PHOTOS_LENGTH;
                setDisplayedPhotos(displayedPhotos.concat(allPhotos.slice(start, end)));
                setCount({ prev: start + DISPLAYED_PHOTOS_LENGTH, next: end + DISPLAYED_PHOTOS_LENGTH });
            }
        }
    };

    useEffect(() => {
        // does the user actually follow people?        
        if (loggedInUserFollowing?.length > 0) {
            loadPhotos();
        }
    }, [loggedInUserId, loggedInUserFollowing]);

    return (
        <>
            <TimeLineWrapper>
                {!displayedPhotos || displayedPhotos.length < 1 ? (
                    <Skeleton count={4} width="100%" height={500} className="mb-5 ml-10" />
                ) : (
                    <InfiniteScroll
                        dataLength={displayedPhotos.length}
                        next={showMorePhotos}
                        hasMore={hasMore}
                        loader={<h4>Loading...</h4>}
                    >

                        {displayedPhotos.map((content) => (<Post key={content.docId} content={content} />))}

                    </InfiniteScroll>
                )}
            </TimeLineWrapper>
        </>
    );
}

Timeline.propTypes = {
    loggedInUserId: PropTypes.string,
    loggedInUserFollowing: PropTypes.array
};
