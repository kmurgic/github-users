import React from 'react';
import PropTypes from 'prop-types';
import Repository from '../Repository';
import './index.css';

const RepositoryList = (props) => {
  const { searchTerm, repos } = props;
  const filteredRepos = repos.filter((repo) => (
    repo.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
  ));

  return (
    <div className="RepositoryList">
      {!filteredRepos.length && <p>No matching repositories</p>}
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
    </div>
  );
};

RepositoryList.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  repos: PropTypes.arrayOf(
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
