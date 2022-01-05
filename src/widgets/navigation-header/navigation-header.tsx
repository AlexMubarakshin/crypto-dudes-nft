import React from 'react';

import { ROUTES } from '../../router';

import NavigationHeaderItem from './navigation-header-item';

import './navigation-header.css';

const NavigationHeader: React.FC = () => (
  <nav className="navigation-header">
    <NavigationHeaderItem route={ROUTES.home}>Dashboard</NavigationHeaderItem>
    <NavigationHeaderItem route={ROUTES.marketplace}>Marketplace</NavigationHeaderItem>
  </nav>
);

export default NavigationHeader;
