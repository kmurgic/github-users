import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './index.css';

const User = memo((props) => {
  const {
    imgUrl, isProfile, userClass, username, url,
  } = props;
  const containerClass = userClass || 'User';
  return (
    <div className={containerClass}>
      <div className="User__image-container">
        {imgUrl && <img alt={`Avatar for ${username}`} className="User__image" src={imgUrl} />}
      </div>
      <div className="User__username-container">
        {isProfile && <a className="User__username" href={url} rel="noopener noreferrer" target="_blank">{username}</a>}
        {username && !isProfile && <Link className="User__username" to={`/${username}/repositories`}>{username}</Link>}
      </div>
    </div>
  );
});

User.defaultProps = {
  userClass: '',
  isProfile: false,
  url: '',
};

User.propTypes = {
  userClass: PropTypes.string,
  imgUrl: PropTypes.string.isRequired,
  isProfile: PropTypes.bool,
  username: PropTypes.string.isRequired,
  url: PropTypes.string,
};

export default User;
