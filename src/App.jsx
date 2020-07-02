import React, { useState } from 'react';
import './App.css';
import Header from './Header';
import users from './users';
import UserList from './UserList';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const search = (newSearchTerm) => setSearchTerm(newSearchTerm);
  return (
    <div className="App">
      <Header search={search} currentSearch={searchTerm} />
      <UserList searchTerm={searchTerm} users={users} />
    </div>
  );
}

export default App;
