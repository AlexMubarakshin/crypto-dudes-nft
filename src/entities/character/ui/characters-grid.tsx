import React from 'react';

import './characters-grid.css';

const CharactersGrid: React.FC = ({ children }) => (
  <div className="characters-grid">
    {children}
  </div>
);

export default CharactersGrid;
