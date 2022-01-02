import React from 'react';

import { useAppDispatch, userModule } from '../../store';

import { Container, Typography } from '../../shared';

import ConnectButton from './connect-button';

const ConnectPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const onAccountConnected = (accountId: string) => {
    dispatch(userModule.actions.setAccountId(accountId));
  };

  return (
    <Container>
      <Typography align="center" variant="h1" gutterBottom style={{ color: '#FFFFFF' }}>
        Hey ✌️
      </Typography>

      <ConnectButton onConnected={onAccountConnected} />

    </Container>
  );
};
export default ConnectPage;
