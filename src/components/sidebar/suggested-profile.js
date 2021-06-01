import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function SuggestedProfile({
  profileDocId,
  profileUserId,
  username,
  handleFollowProfile
}) {
  const [followed, setFollowed] = useState(false);

  const handleFollow = async () => {
    setFollowed(true);

    handleFollowProfile(profileDocId, profileUserId);
  }

  return !followed ? (
    <div className="flex flex-row items-center align-items justify-between">
      <div className="flex items-center justify-between">
        <img
          className="rounded-full w-8 flex mr-3"
          src={`/images/avatars/${username}.jpg`}
          alt=""
          onError={(e) => {
            e.target.src = `/images/avatars/default.png`;
          }}
        />
        <Link to={`/p/${username}`}>
          <p className="font-bold text-sm">{username}</p>
        </Link>
      </div>
      <button
        className="text-xs font-bold text-blue-medium"
        type="button"
        onClick={handleFollow}
      >
        Follow
        </button>
    </div>
  ) : null;
}

SuggestedProfile.propTypes = {
  profileDocId: PropTypes.string.isRequired,
  profileUserId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  handleFollowProfile: PropTypes.func.isRequired
};
