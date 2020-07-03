import React from 'react';
import users from '../../fixtures/users';
import UserList from '.';
import renderWithRouter from '../../testUtils/renderWithRouter';

test('displays a list of all users when there is no search text', () => {
  const { queryByText } = renderWithRouter(<UserList searchTerm="" users={users} />);
  expect(queryByText('atmos')).not.toBe(null);
  expect(queryByText('wycats')).not.toBe(null);
});

test('displays a filtered list of users when there is search text', () => {
  const { queryByText } = renderWithRouter(<UserList searchTerm="mo" users={users} />);
  expect(queryByText('atmos')).not.toBe(null);
  expect(queryByText('wycats')).toBe(null);
});

test('displays no matching results when no usernames match the query', () => {
  const { queryByText } = renderWithRouter(<UserList searchTerm="msfdpxc" users={users} />);
  expect(queryByText('atmos')).toBe(null);
  expect(queryByText('wycats')).toBe(null);
  expect(queryByText('No matching users')).not.toBe(null);
});
