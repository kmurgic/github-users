import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  useParams, Link, useRouteMatch, Switch, Route,
} from 'react-router-dom';
import User from '../User';
import RepositoryList from '../RepositoryList';
import UserList from '../UserList';
import './index.css';

const UserProfile = (props) => {
  const {
    followers, followersLoading, repositories, repositoriesLoading, searchTerm, users,
  } = props;
  const { url } = useRouteMatch();
  const { username } = useParams();
  const [shrinkHeader, setShrinkHeader] = useState(false);

  useEffect(() => {
    const adjustProfileImagePosition = () => {
      const scrollPosition = document.documentElement.scrollTop;
      if (!shrinkHeader && scrollPosition > 84) {
        setShrinkHeader(true);
      } else if (shrinkHeader && scrollPosition < 84) {
        setShrinkHeader(false);
      }
    };
    document.addEventListener('scroll', adjustProfileImagePosition);
    return () => document.removeEventListener('scroll', adjustProfileImagePosition);
  }, [shrinkHeader]);

  const user = users.find((u) => u.username === username);
  const followerTabSelected = !!useRouteMatch(`${url}/followers`);
  const followersTabClass = followerTabSelected ? 'UserProfile__tab--active' : 'UserProfile__tab';
  const repositoriesTabClass = followerTabSelected ? 'UserProfile__tab' : 'UserProfile__tab--active';
  const containerClass = shrinkHeader ? 'UserProfile--shift-down' : 'UserProfile';
  const headerClass = shrinkHeader ? 'UserProfile__header--small' : 'UserProfile__header';
  const profileUserClass = shrinkHeader ? 'User--small-profile' : 'User--profile';

  return (
    <div className={containerClass}>
      {!user && <p>User not found</p>}
      {user && (
        <>
          <div className={headerClass} data-testid="user-profile-header">
            <User
              imgUrl={user.imgUrl}
              isProfile
              url={user.url}
              userClass={profileUserClass}
              username={username}
            />
            <div className="UserProfile__tab-switcher">
              <Link className={repositoriesTabClass} to={`${url}/repositories`}>Repositories</Link>
              <Link className={followersTabClass} to={`${url}/followers`}>Followers</Link>
            </div>
          </div>
          <Switch>
            <Route path={`${url}/followers`}>
              <UserList
                isFollowerList
                loading={followersLoading}
                searchTerm={searchTerm}
                users={followers}
              />
            </Route>
            <Route path={`${url}/repositories`}>
              <RepositoryList
                loading={repositoriesLoading}
                searchTerm={searchTerm}
                repositories={repositories}
              />
            </Route>
          </Switch>
        </>
      )}
    </div>
  );
};

UserProfile.propTypes = {
  followers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      imgUrl: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ).isRequired,
  followersLoading: PropTypes.bool.isRequired,
  repositories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      forks: PropTypes.number.isRequired,
      link: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      watchers: PropTypes.number.isRequired,
    }),
  ).isRequired,
  repositoriesLoading: PropTypes.bool.isRequired,
  searchTerm: PropTypes.string.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      username: PropTypes.string,
    }),
  ).isRequired,
};

export default UserProfile;
