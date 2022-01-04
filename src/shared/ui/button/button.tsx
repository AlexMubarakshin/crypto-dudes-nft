import React from 'react';
import classnames from 'classnames/bind';

import style from './button.module.css';

const cx = classnames.bind(style);

type ButtonVariant = 'contained' | 'outlined';

type Props = {
  className?: string;
  disabled?: boolean;

  variant?: ButtonVariant;
  style?: React.CSSProperties;

  onClick?: () => void;
};

const Button: React.FC<Props> = ({
  className,
  children,
  variant = 'contained',
  disabled,
  // eslint-disable-next-line @typescript-eslint/no-shadow
  style,
  onClick,
}) => (
  <button
    type="button"
    className={cx('button', {
      contained: variant === 'contained',
      outlined: variant === 'outlined',
    }, className)}
    onClick={onClick}
    disabled={disabled}
    style={style}
  >
    {children}
  </button>
);

export default Button;
