import { useState } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import Post from './post';

// What TimeLine actually  need to do:
// - get logged in user's photos (hook -> use-photos)
// - in the meantime the photos are loaded, we need to use skeleton
// - if we have photos, render them (create post componenet)
// - if the user has no photos, tell him/her to create some photos (handle this case in the post componenet)
export default function Timeline({ photos: allPhotos }) {    
    
    // un-comment the foolowing useEffect to check everytime the compoenent is rendered
    // useEffect(() => {
    //     console.log('timeline useEffect is called photos params is ', photos);        
    // });

    const moreDataPerScrollCount = 3;
    const [count, setCount] = useState({
        prev: 0,
        next: moreDataPerScrollCount
    })
    const [hasMore, setHasMore] = useState(true);

    const [photos, setPhotos] = useState(allPhotos.slice(count.prev, count.next));
    const getMoreData = async () => {
        if (photos.length === allPhotos.length) {
            setHasMore(false);
            return;
        }
        setTimeout(() => {
            setPhotos(photos.concat(allPhotos.slice(count.prev + moreDataPerScrollCount, count.next + moreDataPerScrollCount)))
        }, 2000)
        setCount((prevState) => ({ prev: prevState.prev + moreDataPerScrollCount, next: prevState.next + moreDataPerScrollCount }))
    }

    return (
        <InfiniteScroll
            dataLength={photos.length}
            next={getMoreData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}                    
        >

            {photos.map((content) => (<Post key={content.docId} content={content} />))}

        </InfiniteScroll>              
    );
}

Timeline.propTypes = {
    photos: PropTypes.array
};
