import React from 'react';
import PropTypes from 'prop-types';
import User from './User';
import './UserList.css';

const UserList = (props) => {
  const { isFollowerList, searchTerm, users } = props;
  const containerClass = isFollowerList ? 'UserList--followers' : 'UserList';
  const filteredUsers = users.filter((user) => (
    user.username.toLowerCase().includes(searchTerm.toLowerCase().trim())
  ));

  const noResultsText = `No matching ${isFollowerList ? 'followers' : 'users'}`;

  return (
    <div className={containerClass}>
      {!filteredUsers.length && <p>{noResultsText}</p>}
      {filteredUsers.map((user) => (
        <User key={user.id} imgUrl={user.imgUrl} username={user.username} />
      ))}
    </div>
  );
};

UserList.defaultProps = {
  isFollowerList: false,
};

UserList.propTypes = {
  isFollowerList: PropTypes.bool,
  searchTerm: PropTypes.string.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      imgUrl: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default UserList;
