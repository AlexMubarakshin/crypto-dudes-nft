import React from 'react';
import { Routes, Route } from 'react-router-dom';

import {
  ConnectPage,
  HomePage,
  MarketplacePage,
  NotFoundPage,
} from '../pages';

import { ROUTES } from './routes';

import RouteProtected from './route-protected';
import RouteInvisibleWhenAuthorized from './route-invisible-when-autorized';

const Router: React.FC = () => (
  <Routes>
    <Route
      path={ROUTES.connect}
      element={<RouteInvisibleWhenAuthorized><ConnectPage /></RouteInvisibleWhenAuthorized>}
    />

    <Route
      path={ROUTES.home}
      element={(
        <RouteProtected>
          <HomePage />
        </RouteProtected>
      )}
    />

    <Route
      path={ROUTES.marketplace}
      element={(
        <RouteProtected>
          <MarketplacePage />
        </RouteProtected>
      )}
    />

    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default Router;
