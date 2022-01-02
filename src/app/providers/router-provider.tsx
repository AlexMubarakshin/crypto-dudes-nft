import React from 'react';

import { BrowserRouter } from 'react-router-dom';

const RouterProvider: React.FC = ({ children }) => (
  <BrowserRouter>
    {children}
  </BrowserRouter>
);

export default RouterProvider;
