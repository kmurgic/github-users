import React from 'react';
import PropTypes from 'prop-types';
import User from '../User';
import LoadingSpinner from '../LoadingSpinner';
import LoadingEllipsis from '../LoadingEllipsis';
import './index.css';

const UserList = (props) => {
  const {
    isFollowerList, loading, searchTerm, users,
  } = props;
  const containerClass = isFollowerList ? 'UserList--followers' : 'UserList';
  const filteredUsers = users.filter((user) => (
    user.username.toLowerCase().includes(searchTerm.toLowerCase().trim())
  ));

  const noResultsText = `No matching ${isFollowerList ? 'followers' : 'users'}`;
  const showNoResultsText = ((searchTerm || !loading) && !filteredUsers.length);

  /*  Search page is static since we are only filtering previously retrieved results, not searching
      the API. Therefore, no loading spinners should be shown when a search is in progress */
  const showLoadingSpinner = !searchTerm && loading && !filteredUsers.length;
  const showLoadingEllipsis = !searchTerm && loading && !!filteredUsers.length;

  return (
    <div className={containerClass}>
      {showNoResultsText && <p>{noResultsText}</p>}
      {filteredUsers.map((user) => (
        <User key={user.id} imgUrl={user.imgUrl} username={user.username} />
      ))}
      {showLoadingSpinner && <LoadingSpinner />}
      {showLoadingEllipsis && <LoadingEllipsis />}
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
      url: PropTypes.string.isRequired,
    }),
  ).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default UserList;
