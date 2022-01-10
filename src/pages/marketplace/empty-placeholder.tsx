import React from 'react';

import { Typography } from '../../shared';

import './empty-placeholder.css';

const EmptyPlaceholder: React.FC = () => (
  <div className="empty-placeholder">
    <Typography variant="h2">
      No offers yet 🥸
    </Typography>
  </div>
);

export default EmptyPlaceholder;
