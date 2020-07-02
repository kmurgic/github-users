import React from 'react';
import PropTypes from 'prop-types';
import User from './User';

const UserList = (props) => {
  const { searchTerm, users } = props;
  const filteredUsers = users.filter((user) => (
    user.username.toLowerCase().includes(searchTerm.toLowerCase().trim())
  ));
  if (!filteredUsers.length) {
    return <p>No matching users</p>;
  }
  return (
    <>
      {filteredUsers.map((user) => (
        <User key={user.username} imgUrl={user.imgUrl} username={user.username} />
      ))}
    </>
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
