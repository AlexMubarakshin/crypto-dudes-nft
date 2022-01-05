import React from 'react';

import { Link } from 'react-router-dom';

import { ROUTES } from '../../router';
import { Typography } from '../../shared';

import './navigation-header-item.css';

type Props = {
  route: ValueOf<typeof ROUTES>
};

const NavigationHeaderItem: React.FC<Props> = ({ children, route }) => (
  <Link className="navigation-header-item" to={route}>
    <Typography variant="button" bold>
      {children}
    </Typography>
  </Link>
);

export default NavigationHeaderItem;
