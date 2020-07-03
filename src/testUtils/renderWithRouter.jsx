import React from 'react';
import PropTypes from 'prop-types';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router, Route, MemoryRouter } from 'react-router-dom';

/* Based off example from https://testing-library.com/docs/example-react-router */

const renderWithRouter = (
  ui,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
    path = '/',
    useMemoryRouter = false,
  } = {},
) => {
  const Wrapper = ({ children }) => {
    if (useMemoryRouter) {
      return (
        <MemoryRouter initialEntries={[route]}>
          {path && <Route path={path}>{children}</Route>}
          {!path && children}
        </MemoryRouter>
      );
    }
    return (
      <Router history={history}>
        {path && <Route path={path}>{children}</Route>}
        {!path && children}
      </Router>
    );
  };
  Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
  };
  return {
    ...render(ui, { wrapper: Wrapper }), history,
  };
};

export default renderWithRouter;
