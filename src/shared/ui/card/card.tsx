import React from 'react';
import classnames from 'classnames/bind';

import style from './card.module.css';

const cx = classnames.bind(style);

type Props = {
  className?: string;
  actions?: React.ReactElement;
};

const Card: React.FC<Props> = ({
  className,
  children,
  actions = null,
}) => (
  <div className={cx('card', className)}>
    <div className={cx('card-content')}>
      {children}
    </div>

    {actions}
  </div>
);

export default Card;
