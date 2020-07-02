import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Header from './Header';

test('updates search text', () => {
  const mockSearch = jest.fn();
  const { queryByPlaceholderText } = render(<Header currentSearch="" search={mockSearch} />);
  const searchInput = queryByPlaceholderText('Search...');
  fireEvent.input(searchInput, { target: { value: 'foo' } });
  expect(searchInput.value).toBe('foo');
});

test('performs a search', () => {
  const mockSearch = jest.fn();
  const { queryByPlaceholderText, getByRole } = render(
    <Header currentSearch="" search={mockSearch} />,
  );
  const searchInput = queryByPlaceholderText('Search...');
  fireEvent.input(searchInput, { target: { value: 'foo' } });
  const searchButton = getByRole('button');
  fireEvent.click(searchButton);
  expect(mockSearch).toHaveBeenCalledWith('foo');
});

test('clears search text', () => {
  const mockSearch = jest.fn();
  const { queryByPlaceholderText, queryByText } = render(<Header currentSearch="foo" search={mockSearch} />);
  const searchInput = queryByPlaceholderText('Search...');
  fireEvent.input(searchInput, { target: { value: 'foo' } });
  const searchButton = document.querySelector('.Header__icon-button');
  fireEvent.click(searchButton);
  const clearButton = queryByText('clear');
  fireEvent.click(clearButton);
  expect(searchInput.value).toBe('');
  expect(mockSearch).toHaveBeenCalledWith('');
});
