import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

// Components
import { UserProfileRoundedImage } from '../userProfileRoundedImage';

export default function UserProfileNavItem({ username }) {
    return (
        <Link to={`/p/${username}`}>
            <UserProfileRoundedImage username={username} />
        </Link>
    );
}

UserProfileNavItem.propTypes = {
    username: PropTypes.string
};