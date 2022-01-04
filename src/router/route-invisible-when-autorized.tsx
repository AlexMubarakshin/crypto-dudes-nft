import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';

import { ROUTES } from './routes';
import { useAppSelector, connectionModule, userModule } from '../store';

const useConnectionListener = () => {
  const isConnected = useAppSelector(connectionModule.selectConnected);
  const isAuthorized = useAppSelector(userModule.selectAccountId);

  return ({
    isConnected,
    isAuthorized,
  });
};

const RouteInvisibleWhenAuthorized = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();

  const { isAuthorized, isConnected } = useConnectionListener();

  if (isAuthorized && isConnected) {
    return <Navigate to={ROUTES.home} state={{ from: location }} replace />;
  }

  return children;
};

export default RouteInvisibleWhenAuthorized;
