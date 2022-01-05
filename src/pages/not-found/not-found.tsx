import React from 'react';
import { Link } from 'react-router-dom';

import { ROUTES } from '../../router';

import { Button, Container, Typography } from '../../shared';

import './not-found.css';

const NotFoundPage: React.FC = () => (
  <Container className="not-found-container">
    <Typography variant="h1" gutterBottom style={{ color: '#fff' }}>404</Typography>

    <Link to={ROUTES.home} replace>
      <Button>
        Go home
      </Button>
    </Link>
  </Container>
);

export default NotFoundPage;
