import React from 'react';

import {
  Button, Container, Typography,
} from '../../shared';

import { useConnectPage } from './hooks';

import './connect.css';

const ConnectPage: React.FC = () => {
  const { connecting, onConnectClick } = useConnectPage();

  return (
    <Container className="connect-container">
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
