import React from 'react';

import './loader.css';

const Loader: React.FC = () => (
  <div className="loader">
    <div className="loader-line-wrap">
      <div className="loader-line" />
    </div>
    <div className="loader-line-wrap">
      <div className="loader-line" />
    </div>
    <div className="loader-line-wrap">
      <div className="loader-line" />
    </div>
    <div className="loader-line-wrap">
      <div className="loader-line" />
    </div>
    <div className="loader-line-wrap">
      <div className="loader-line" />
    </div>
  </div>
);

export default Loader;
