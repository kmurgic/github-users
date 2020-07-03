import React from 'react';
import PropTypes from 'prop-types';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

/* Based off example from https://testing-library.com/docs/example-react-router */

const renderWithRouter = (
  ui,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {},
) => {
  const Wrapper = ({ children }) => (
    <Router history={history}>{children}</Router>
  );
  Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
  };
  return {
    ...render(ui, { wrapper: Wrapper }), history,
  };
};

export default renderWithRouter;
