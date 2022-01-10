import React from 'react';
import classnames from 'classnames/bind';

import { ButtonProps } from './types';

import style from './button.module.css';

const cx = classnames.bind(style);

const Button: React.FC<ButtonProps> = ({
  className,
  children,
  variant = 'contained',
  disabled,
  title,
  // eslint-disable-next-line @typescript-eslint/no-shadow
  style,
  onClick,
}) => (
  <button
    type="button"
    className={cx('button', {
      contained: variant === 'contained',
      outlined: variant === 'outlined',
      text: variant === 'text',
      icon: variant === 'icon',
    }, className)}
    onClick={onClick}
    disabled={disabled}
    style={style}
    title={title}
  >
    {children}
  </button>
);

export default Button;
