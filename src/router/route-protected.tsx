import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';

import { ROUTES } from './routes';
import {
  connectionModule, useAppDispatch, useAppSelector, userModule,
} from '../store';

const useConnectionListener = () => {
  const dispatch = useAppDispatch();

  const isConnected = useAppSelector(connectionModule.selectConnected);
  const isAuthorized = useAppSelector(userModule.selectAccountId);

  React.useEffect(() => {
    (window as any).ethereum.on('accountsChanged', (accounts: any[]) => {
      dispatch(userModule.actions.setAccountId(accounts[0]));
    });

    (window as any).ethereum.on('chainChanged', () => {
      window.location.reload();
    });
  }, []);

  return ({
    isConnected,
    isAuthorized,
  });
};

const RouteProtected = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const { isConnected, isAuthorized } = useConnectionListener();

  if (!isAuthorized && !isConnected) {
    return <Navigate to={ROUTES.connect} state={{ from: location }} replace />;
  }

  return children;
};

export default RouteProtected;
