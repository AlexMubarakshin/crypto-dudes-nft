import React from 'react';
import classnames from 'classnames/bind';

import style from './card.module.css';

const cx = classnames.bind(style);

type Props = {
  className?: string;
  header?: React.ReactElement;
  actions?: React.ReactElement;
};

const Card: React.FC<Props> = ({
  className,
  children,
  header,
  actions = null,
}) => (
  <div className={cx('card', className)}>
    {
      header && (
        <div className={cx('card-header')}>
          {header}
        </div>
      )
    }
    <div className={cx('card-content')}>
      {children}
    </div>

    {actions}
  </div>
);

export default Card;
