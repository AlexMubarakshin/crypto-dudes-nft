import React from 'react';

import style from './typography.css';

import classnames from 'classnames/bind';

const cx = classnames.bind(style);


type TypographyVariant = 'body' | 'button'

type Props = {
  variant?: TypographyVariant
}

const Typography: React.FC<Props> = ({ children, variant = 'body' }) => {
  return (
    <div className={cx('typography', {
      body: variant === 'body',
      button: variant === 'button',
    })}>
      {children}
    </div>
  );
};

export default Typography;
