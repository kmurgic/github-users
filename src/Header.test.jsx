import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

test('updates search text', () => {
  const { queryByPlaceholderText } = render(<App />);
  const searchInput = queryByPlaceholderText('Search...');
  fireEvent.input(searchInput, { target: { value: 'foo' } });
  expect(searchInput.value).toBe('foo');
});

test('performs a search', () => {
  const { queryByPlaceholderText, queryByText, getByRole } = render(<App />);
  const searchInput = queryByPlaceholderText('Search...');
  fireEvent.input(searchInput, { target: { value: 'foo' } });
  const searchButton = getByRole('button');
  fireEvent.click(searchButton);
  expect(queryByText('Displaying search results for "foo"')).not.toBe(null);
});

test('clears search text', () => {
  const { queryByPlaceholderText, queryByText, getByRole } = render(<App />);
  const searchInput = queryByPlaceholderText('Search...');
  fireEvent.input(searchInput, { target: { value: 'foo' } });
  const searchButton = getByRole('button');
  fireEvent.click(searchButton);
  const clearButton = queryByText('clear');
  fireEvent.click(clearButton);
  expect(searchInput.value).toBe('');
  expect(queryByText('Displaying search results for "foo"')).toBe(null);
});
