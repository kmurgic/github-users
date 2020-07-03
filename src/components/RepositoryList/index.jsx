import React from 'react';
import PropTypes from 'prop-types';
import Repository from '../Repository';
import LoadingSpinner from '../LoadingSpinner';
import LoadingEllipsis from '../LoadingEllipsis';
import './index.css';

const RepositoryList = (props) => {
  const { loading, searchTerm, repositories } = props;
  const filteredRepos = repositories.filter((repo) => (
    repo.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
  ));

  const showNoResultsText = ((searchTerm || !loading) && !filteredRepos.length);

  /*  Search page is static since we are only filtering previously retrieved results, not searching
      the API. Therefore, no loading spinners should be shown when a search is in progress */
  const showLoadingSpinner = !searchTerm && loading && !filteredRepos.length;
  const showLoadingEllipsis = !searchTerm && loading && filteredRepos.length;

  return (
    <div className="RepositoryList">
      {showNoResultsText && <p>No matching repositories</p>}
      {filteredRepos.map((repo) => (
        <Repository
          key={repo.id}
          description={repo.description}
          forks={repo.forks}
          link={repo.link}
          name={repo.name}
          watchers={repo.watchers}
        />
      ))}
      {showLoadingSpinner && <LoadingSpinner />}
      {showLoadingEllipsis && <LoadingEllipsis />}
    </div>
  );
};

RepositoryList.propTypes = {
  loading: PropTypes.bool.isRequired,
  searchTerm: PropTypes.string.isRequired,
  repositories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      forks: PropTypes.number.isRequired,
      link: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      watchers: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default RepositoryList;
