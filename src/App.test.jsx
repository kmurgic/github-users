import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from './App';
import renderWithRouter from './renderWithRouter';

// Integration tests

test('renders', () => {
  const { getByText } = renderWithRouter(<App />);
  const title = getByText(/github user list/i);
  expect(title).toBeInTheDocument();
});

test('filters users on search', () => {
  const { getByRole, queryByText, queryByPlaceholderText } = renderWithRouter(<App />);
  expect(queryByText('atmos')).not.toBe(null);
  expect(queryByText('wycats')).not.toBe(null);
  const searchInput = queryByPlaceholderText('Search...');
  fireEvent.input(searchInput, { target: { value: 'mo' } });
  const searchButton = getByRole('button');
  fireEvent.click(searchButton);
  expect(queryByText('atmos')).not.toBe(null);
  expect(queryByText('wycats')).toBe(null);
});
