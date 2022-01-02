import React from 'react';

import './style.css';

import { RouterProvider, StoreProvider } from './providers';
import { Router } from '../router';

const App: React.FC = () => (
  <StoreProvider>
    <RouterProvider>
      <Router />
    </RouterProvider>
  </StoreProvider>
);

export default App;
