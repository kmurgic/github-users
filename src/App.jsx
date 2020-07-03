import React, { useState, useEffect } from 'react';
import {
  Switch,
  Route,
  useLocation,
} from 'react-router-dom';
import Header from './Header';
import users from './fixtures/users';
import UserList from './UserList';
import './App.css';
import UserProfile from './UserProfile';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const search = (newSearchTerm) => setSearchTerm(newSearchTerm);
  const location = useLocation();

  // Reset search whenever user changes pages
  useEffect(() => {
    setSearchTerm('');
  }, [location]);

  return (
    <div className="App">
      <Header search={search} currentSearch={searchTerm} />
      <Switch>
        <Route exact path="/">
          <UserList searchTerm={searchTerm} users={users} />
        </Route>
        <Route path="/users/:username">
          <UserProfile searchTerm={searchTerm} users={users} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
