import React from 'react';

import classnames from 'classnames';

import './container.css';

type Props = {
  className?: string;
};

const Container: React.FC<Props> = ({ children, className }) => (
  <div className={classnames('container', className)}>
    {children}
  </div>
);

export default Container;
