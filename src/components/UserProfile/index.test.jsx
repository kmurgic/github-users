import React from 'react';
import { fireEvent } from '@testing-library/react';
import users from '../../fixtures/users';
import UserProfile from '.';
import renderWithRouter from '../../testUtils/renderWithRouter';
import repositories from '../../fixtures/repositories';
import followers from '../../fixtures/followers';

const userProfile = (
  <UserProfile
    followers={followers}
    followersLoading={false}
    repositories={repositories}
    repositoriesLoading={false}
    searchTerm=""
    users={users}
  />
);
test('displays a user with a list of repos for a path ending in /repository', () => {
  const { queryByText } = renderWithRouter(userProfile, { path: '/:username', route: '/mojombo/repositories', useMemoryRouter: true });
  expect(queryByText('mojombo')).not.toBe(null);
  expect(queryByText('.github')).not.toBe(null);
  expect(queryByText('defunkt')).toBe(null);
});

test('displays a user with a list of followers for a path ending in /repository', () => {
  const { queryByText } = renderWithRouter(userProfile, { path: '/:username', route: '/mojombo/followers', useMemoryRouter: true });
  expect(queryByText('mojombo')).not.toBe(null);
  expect(queryByText('.github')).toBe(null);
  expect(queryByText('defunkt')).not.toBe(null);
});

test('adjusts header on scroll', () => {
  const { queryByTestId } = renderWithRouter(userProfile, { path: '/:username', route: '/mojombo/repositories', useMemoryRouter: true });
  document.documentElement.scrollTop = 85;
  fireEvent.scroll(document);
  expect(queryByTestId('user-profile-header').className).toBe('UserProfile__header--small');
  document.documentElement.scrollTop = 80;
  fireEvent.scroll(document);
  expect(queryByTestId('user-profile-header').className).toBe('UserProfile__header');
  document.documentElement.scrollTop = 80;
  fireEvent.scroll(document);
  expect(queryByTestId('user-profile-header').className).toBe('UserProfile__header');
});

test('shows user not found if no users match url params', () => {
  const { queryByText } = renderWithRouter(userProfile, { path: '/users/:username', route: '/users/notarealusername/repositories', useMemoryRouter: true });
  expect(queryByText('User not found')).not.toBe(null);
});
