import React, { useState, useEffect, useRef } from 'react';
import {
  Switch,
  Route,
  useLocation,
  Redirect,
} from 'react-router-dom';
import Header from '../Header';
import UserList from '../UserList';
import UserProfile from '../UserProfile';
import fetchUsers from '../../api/fetchUsers';
import fetchRepositories from '../../api/fetchRepositories';
import fetchFollowers from '../../api/fetchFollowers';
import NotFound from '../NotFound';
import './index.css';

function App() {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  /* searchTermRef is needed to check search term from asynchronous code,
    https://reactjs.org/docs/hooks-faq.html#why-am-i-seeing-stale-props-or-state-inside-my-function */
  const searchTermRef = useRef('');

  const [usersLoading, setUsersLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [nextUserUrl, setNextUserUrl] = useState('');

  const [repositoriesLoading, setRepositoriesLoading] = useState(false);
  const [repositories, setRepositories] = useState({});
  const [repositoriesForSelectedUser, setRepositoriesForSelectedUser] = useState([]);

  const [followersLoading, setFollowersLoading] = useState(false);
  const [followers, setFollowers] = useState({});
  const [followersForSelectedUser, setFollowersForSelectedUser] = useState([]);

  const search = (newSearchTerm) => {
    searchTermRef.current = newSearchTerm;
    setSearchTerm(newSearchTerm);
  };

  // Reset search whenever user changes pages
  useEffect(() => {
    searchTermRef.current = '';
    setSearchTerm('');
  }, [location]);

  const getNumberOfHiddenItems = () => {
    const documentEl = document.documentElement;
    const hiddenHeight = documentEl.scrollHeight - documentEl.clientHeight - documentEl.scrollTop;
    return Math.ceil(hiddenHeight / 102);
  };

  const previousUserUrl = useRef(null);
  const previousRepositoriesUrl = useRef(null);
  const previousFollowersUrl = useRef(null);

  // TODO: Better error handling
  const handleError = (error) => console.error(error);

  const followersPathRegex = /^\/[a-z\d-]*\/followers$/;
  const isFollowersPage = followersPathRegex.test(location.pathname);

  const repositoriesPathRegex = /^\/[a-z\d-]*\/repositories$/;
  const isRepositoriesPage = repositoriesPathRegex.test(location.pathname);

  useEffect(() => {
    const fetchMoreUsersIfNeeded = async () => {
      const repeatUrl = nextUserUrl === previousUserUrl.current;
      if (!searchTermRef.current && !usersLoading && !repeatUrl && nextUserUrl !== null
        && location.pathname === '/' && getNumberOfHiddenItems() < 100) {
        previousUserUrl.current = nextUserUrl;
        setUsersLoading(true);
        const { error, nextUrl, userList } = await fetchUsers(nextUserUrl);
        if (error) {
          handleError(error);
          return;
        }
        if (searchTermRef.current) return;
        setNextUserUrl(nextUrl);
        setUsers((prev) => [...prev, ...userList]);
        setUsersLoading(false);
      }
    };
    const fetchMoreRepositoriesIfNeeded = async () => {
      if (!isRepositoriesPage) {
        if (repositoriesForSelectedUser.length) {
          setRepositoriesForSelectedUser([]);
        }
        return;
      }
      const selectedUser = location.pathname.slice(1, location.pathname.indexOf('/', 1));
      setRepositoriesForSelectedUser(repositories[selectedUser]
        ? repositories[selectedUser].list : []);
      const firstFetchUrl = `https://api.github.com/users/${selectedUser}/repos`;
      const nextRepositoriesUrl = repositories[selectedUser]
        ? repositories[selectedUser].nextUrl : firstFetchUrl;
      const repeatUrl = nextRepositoriesUrl === previousRepositoriesUrl.current;
      if (!searchTermRef.current && !repositoriesLoading && !repeatUrl && nextRepositoriesUrl
        && getNumberOfHiddenItems() < 100) {
        previousRepositoriesUrl.current = nextRepositoriesUrl;
        setRepositoriesLoading(true);
        const { error, nextUrl, repositoriesList } = await fetchRepositories(nextRepositoriesUrl);
        if (error) {
          handleError(error);
          return;
        }
        if (searchTermRef.current) return;
        setRepositories((prev) => {
          const prevRepositories = prev[selectedUser];
          if (prevRepositories) {
            const newRepositories = [...prevRepositories.list, ...repositoriesList];
            setRepositoriesForSelectedUser(newRepositories);
            return {
              ...prev,
              [selectedUser]: {
                list: newRepositories,
                nextUrl,
              },
            };
          }
          const newRepositories = repositoriesList;
          setRepositoriesForSelectedUser(newRepositories);
          return {
            ...prev,
            [selectedUser]: {
              list: repositoriesList,
              nextUrl,
            },
          };
        });
        setRepositoriesLoading(false);
      }
    };
    const fetchMoreFollowersIfNeeded = async () => {
      if (!isFollowersPage) {
        if (followersForSelectedUser.length) {
          setFollowersForSelectedUser([]);
        }
        return;
      }
      const selectedUser = location.pathname.slice(1, location.pathname.indexOf('/', 1));
      setFollowersForSelectedUser(followers[selectedUser]
        ? followers[selectedUser].list : []);
      const firstFetchUrl = `https://api.github.com/users/${selectedUser}/followers`;
      const nextFollowersUrl = followers[selectedUser]
        ? followers[selectedUser].nextUrl : firstFetchUrl;
      const repeatUrl = nextFollowersUrl === previousFollowersUrl.current;
      if (!searchTermRef.current && !followersLoading && !repeatUrl && nextFollowersUrl
        && getNumberOfHiddenItems() < 100) {
        previousFollowersUrl.current = nextFollowersUrl;
        setFollowersLoading(true);
        const { error, nextUrl, followersList } = await fetchFollowers(nextFollowersUrl);
        if (error) {
          handleError(error);
          return;
        }
        if (searchTermRef.current) return;
        setFollowers((prev) => {
          const prevFollowers = prev[selectedUser];
          if (prevFollowers) {
            const newFollowers = [...prevFollowers.list, ...followersList];
            setFollowersForSelectedUser(newFollowers);
            return {
              ...prev,
              [selectedUser]: {
                list: newFollowers,
                nextUrl,
              },
            };
          }
          const newFollowers = followersList;
          setFollowersForSelectedUser(newFollowers);
          return {
            ...prev,
            [selectedUser]: {
              list: followersList,
              nextUrl,
            },
          };
        });
        setFollowersLoading(false);
      }
    };
    const fetchMoreIfNeeded = () => {
      fetchMoreUsersIfNeeded();
      fetchMoreRepositoriesIfNeeded();
      fetchMoreFollowersIfNeeded();
    };
    fetchMoreIfNeeded();
    document.addEventListener('scroll', fetchMoreIfNeeded);
    return () => document.removeEventListener('scroll', fetchMoreIfNeeded);
  }, [
    location.pathname, nextUserUrl, searchTerm, usersLoading, users, repositoriesLoading,
    followersLoading, repositories, followers, repositoriesForSelectedUser.length,
    followersForSelectedUser.length, isRepositoriesPage, isFollowersPage,
  ]);

  if (!users.length && (isFollowersPage || isRepositoriesPage)) {
    return (
      <Redirect to="/" />
    );
  }

  if (location.pathname !== '/' && !isFollowersPage && !isRepositoriesPage) {
    return (
      <NotFound />
    );
  }

  return (
    <div className="App">
      <Header search={search} currentSearch={searchTerm} />
      <Switch>
        <Route exact path="/">
          <UserList loading={usersLoading} searchTerm={searchTerm} users={users} />
        </Route>
        <Route path="/:username">
          <UserProfile
            followers={followersForSelectedUser}
            followersLoading={followersLoading}
            repositories={repositoriesForSelectedUser}
            repositoriesLoading={repositoriesLoading}
            searchTerm={searchTerm}
            users={users}
          />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
