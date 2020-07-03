import React from 'react';
import repositories from '../../fixtures/repositories';
import RepositoryList from '.';
import renderWithRouter from '../../testUtils/renderWithRouter';

test('displays a list of all repositories when there is no search text', () => {
  const { queryByText } = renderWithRouter(<RepositoryList searchTerm="" repositories={repositories} loading={false} />);
  expect(queryByText('2016-campaign-tech')).not.toBe(null);
  expect(queryByText('add-to-org')).not.toBe(null);
});

test('displays a filtered list of repositories when there is search text', () => {
  const { queryByText } = renderWithRouter(<RepositoryList searchTerm="add" repositories={repositories} loading={false} />);
  expect(queryByText('2016-campaign-tech')).toBe(null);
  expect(queryByText('add-to-org')).not.toBe(null);
});

test('displays no matching results when no repository names match the query', () => {
  const { queryByText } = renderWithRouter(<RepositoryList searchTerm="msfdpxc" repositories={repositories} loading={false} />);
  expect(queryByText('2016-campaign-tech')).toBe(null);
  expect(queryByText('add-to-org')).toBe(null);
  expect(queryByText('No matching repositories')).not.toBe(null);
});
