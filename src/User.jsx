import React, { memo } from 'react';
import PropTypes from 'prop-types';
import './User.css';

const User = memo((props) => {
  const { imgUrl, username } = props;
  return (
    <div className="User">
      <div className="User__image-container">
        {imgUrl && <img alt={`Avatar for ${username}`} className="User__image" src={imgUrl} />}
      </div>
      <div className="User__username-container">
        {username && <h3 className="User__username">{username}</h3>}
      </div>
    </div>
  );
});

User.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default User;
