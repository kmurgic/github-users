import React from 'react';
import PropTypes from 'prop-types';
import User from './User';
import './UserList.css';

const UserList = (props) => {
  const { searchTerm, users } = props;
  const filteredUsers = users.filter((user) => (
    user.username.toLowerCase().includes(searchTerm.toLowerCase().trim())
  ));

  return (
    <div className="UserList">
      {!filteredUsers.length && <p>No matching users</p>}
      {filteredUsers.map((user) => (
        <User key={user.username} imgUrl={user.imgUrl} username={user.username} />
      ))}
    </div>
  );
};

UserList.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      username: PropTypes.string,
    }),
  ).isRequired,
};

export default UserList;
