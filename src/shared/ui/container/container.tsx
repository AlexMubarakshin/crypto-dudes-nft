import React from 'react';

import classnames from 'classnames';

import './container.css';

type Props = {
  className?: string;

  header?: React.ReactElement;
};

const Container: React.FC<Props> = ({ children, className, header }) => (
  <div className={classnames('container', className)}>
    <div className={classnames('container-inner')}>
      {header}
      {children}
    </div>
  </div>
);

export default Container;
