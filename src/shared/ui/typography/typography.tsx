import React, { CSSProperties } from 'react';

import classnames from 'classnames/bind';
import style from './typography.module.css';

const cx = classnames.bind(style);

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'body' | 'body2' | 'button';
type TypographyAlign = 'center'
| 'inherit'
| 'justify'
| 'left'
| 'right';

type Props = {
  align?: TypographyAlign;
  className?: string;
  style?: CSSProperties;
  variant?: TypographyVariant;
  bold?: boolean;
  gutterBottom?: boolean;
};

const Typography: React.FC<Props> = ({
  children,
  className,
  // eslint-disable-next-line @typescript-eslint/no-shadow
  style = {},
  align,
  variant = 'body',
  gutterBottom,
  bold,
}) => (
  <div
    className={cx('typography', {
      body: variant === 'body',
      body2: variant === 'body2',
      button: variant === 'button',
      h1: variant === 'h1',
      h2: variant === 'h2',
      h3: variant === 'h3',
      bold,
      gutterBottom,
    }, className)}
    style={{ textAlign: align, ...style }}
  >
    {children}
  </div>
);

export default Typography;
