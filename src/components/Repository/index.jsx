import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faCodeBranch } from '@fortawesome/free-solid-svg-icons';
import './index.css';

const Repository = memo((props) => {
  const {
    watchers, forks, link, name, description,
  } = props;
  return (
    <div className="Repository">
      <h4 className="Repository__title">
        <a className="Repository__link" href={link} rel="noopener noreferrer" target="_blank">{name}</a>
      </h4>
      <p className="Repository__description">{description}</p>
      <div className="Repository__statistics">
        <span className="Repository__watchers">
          <FontAwesomeIcon className="Repository__icon" icon={faEye} />
          <span className="Repository__count">{watchers}</span>
        </span>
        <span className="Repository__forks">
          <FontAwesomeIcon className="Repository__icon" icon={faCodeBranch} />
          <span className="Repository__count">{forks}</span>
        </span>
      </div>
    </div>
  );
});

Repository.propTypes = {
  description: PropTypes.string.isRequired,
  forks: PropTypes.number.isRequired,
  link: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  watchers: PropTypes.number.isRequired,
};

export default Repository;
