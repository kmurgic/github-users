import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { useLocation, Link } from 'react-router-dom';
import './index.css';

const Header = (props) => {
  const { currentSearch, search } = props;

  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();

  // Reset search whenever user changes pages
  useEffect(() => {
    setSearchTerm('');
  }, [location]);

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
      <h1 className="Header__title"><Link className="Header__link" to={`${process.env.PUBLIC_URL}/`}>Github User List</Link></h1>
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
