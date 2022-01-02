import React from 'react';
import { Link } from 'react-router-dom';

import { ROUTES } from '../../router';

import { Button, Container, Typography } from '../../shared';

const NotFoundPage: React.FC = () => (
  <Container>
    <Typography variant="h1" gutterBottom style={{ color: '#fff' }}>404</Typography>

    <Link to={ROUTES.home} replace>
      <Button>
        Go home
      </Button>
    </Link>
  </Container>
);

export default NotFoundPage;
