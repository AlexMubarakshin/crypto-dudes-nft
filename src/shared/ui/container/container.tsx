import React from 'react';

import './container.css'

const Container: React.FC = ({ children }) => {
  return (
    <div className='container'>
      {children}
    </div>
  );
};

export default Container;
