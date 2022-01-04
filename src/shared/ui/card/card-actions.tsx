import React from 'react';

import './card-actions.css';

const CardActions: React.FC = ({ children }) => (
  <div className="card-actions">
    {children}
  </div>
);

export default CardActions;
