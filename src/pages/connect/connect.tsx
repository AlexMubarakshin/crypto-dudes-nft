import React from 'react';

import {
  Button, Container, Typography,
} from '../../shared';

import { useConnectPage } from './hooks';

const ConnectPage: React.FC = () => {
  const { connecting, onConnectClick } = useConnectPage();

  return (
    <Container>
      <Typography align="center" variant="h1" gutterBottom style={{ color: '#FFFFFF' }}>
        Hey ✌️
      </Typography>

      <Button onClick={onConnectClick} disabled={connecting}>
        Connect wallet
      </Button>

    </Container>
  );
};
export default ConnectPage;
