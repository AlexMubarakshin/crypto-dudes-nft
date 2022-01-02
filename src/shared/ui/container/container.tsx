import React from 'react';

import './container.css';

const Container: React.FC = ({ children }) => (
  <div className="container">
    {children}
  </div>
);

export default Container;
