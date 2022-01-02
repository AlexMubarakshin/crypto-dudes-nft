import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';

import { ROUTES } from './routes';
import { useAppSelector, userModule } from '../store';

const RouteInvisibleWhenAuthorized = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const isAuthorized = useAppSelector(userModule.selectAccountId);

  if (isAuthorized) {
    return <Navigate to={ROUTES.home} state={{ from: location }} replace />;
  }

  return children;
};

export default RouteInvisibleWhenAuthorized;
