import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import './Header.css';

const Header = (props) => {
  const { currentSearch, search } = props;

  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleInputFocus = (e) => {
    e.currentTarget.select();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    search(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm('');
    search('');
  };

  return (
    <div className="Header">
      <h1 className="Header__title">Github User List</h1>
      <form className="Header__form">
        <input
          className="Header__input"
          onChange={handleChange}
          onFocus={handleInputFocus}
          placeholder="Search..."
          type="search"
          value={searchTerm}
        />
        <button
          className="Header__icon-button"
          onClick={handleSubmit}
          type="submit"
        >
          <FontAwesomeIcon className="Header__icon" icon={faSearch} />
        </button>
      </form>
      <p className="Header__search-text">
        {currentSearch.trim() && (
          <>
            {`Displaying search results for "${currentSearch}"`}
            {' '}
            <button className="Header__clear-button" onClick={handleClear} type="button">clear</button>
          </>
        )}
      </p>
    </div>
  );
};

Header.propTypes = {
  currentSearch: PropTypes.string.isRequired,
  search: PropTypes.func.isRequired,
};

export default Header;
