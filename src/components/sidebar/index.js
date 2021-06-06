import PropTypes from 'prop-types';
import Suggestions from './suggestions';
import User from './user';

export default function Sidebar({ loggedInUser }) {
  return (
    <div className="p-4">
      <User username={loggedInUser?.username} fullName={loggedInUser?.fullName} />
      <Suggestions loggedInUserDocId={loggedInUser?.docId} loggedInUserId={loggedInUser?.userId} loggedInUserFollowing={loggedInUser?.following} />
    </div>
  );
}

// Sidebar.whyDidYouRender = true
Sidebar.propTypes = {
  loggedInUser: PropTypes.object
};