import React from 'react';

import { Container, Typography } from '../../shared';

import ConnectButton from './connect-button';

const ConnectPage: React.FC = () => (
  <Container>
    <Typography align="center" variant="h1" gutterBottom style={{ color: '#FFFFFF' }}>
      Hey ✌️
    </Typography>
    <ConnectButton />
  </Container>
);

export default ConnectPage;
