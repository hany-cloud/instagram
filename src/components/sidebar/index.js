import PropTypes from 'prop-types';
import Suggestions from './suggestions';
import User from './user';

export default function Sidebar({ loggedInUser, setTimelinePhotos }) {
  return (
    <div className="p-4">
      <User username={loggedInUser?.username} fullName={loggedInUser?.fullName} />
      <Suggestions loggedInUser={loggedInUser|| {}} setTimelinePhotos={setTimelinePhotos} />
    </div>
  );
}

// Sidebar.whyDidYouRender = true
Sidebar.propTypes = {
  loggedInUser: PropTypes.object,
  setTimelinePhotos: PropTypes.func.isRequired
};