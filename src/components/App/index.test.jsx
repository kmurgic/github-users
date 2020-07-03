import React from 'react';
import App from '.';
import renderWithRouter from '../../testUtils/renderWithRouter';
import users from '../../fixtures/users';
import repositories from '../../fixtures/repositories';
import followers from '../../fixtures/followers';

// Integration tests

let oldEnv;
beforeEach(() => {
  oldEnv = process.env;
  const mockUsers = { ...users };
  const mockRepositories = { ...repositories };
  const mockFollowers = { ...followers };
  jest.mock('../../api/fetchUsers', () => ({
    __esModule: true,
    default: jest.fn(() => (mockUsers)),
  }));
  jest.mock('../../api/fetchRepositories', () => ({
    __esModule: true,
    default: jest.fn(() => (mockRepositories)),
  }));
  jest.mock('../../api/fetchFollowers', () => ({
    __esModule: true,
    default: jest.fn(() => (mockFollowers)),
  }));
  process.env = { PUBLIC_URL: '/' };
});
afterEach(() => {
  jest.clearAllMocks();
  process.env = oldEnv;
});

test('renders with a title', () => {
  const { getByText } = renderWithRouter(<App />);
  const title = getByText(/github user list/i);
  expect(title).toBeInTheDocument();
});
