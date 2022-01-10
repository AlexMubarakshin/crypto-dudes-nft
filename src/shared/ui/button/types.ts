import React from 'react';

export type ButtonVariant = 'contained' | 'outlined' | 'text' | 'icon';

export type ButtonProps = {
  className?: string;
  disabled?: boolean;

  title?: string;

  variant?: ButtonVariant;
  style?: React.CSSProperties;

  onClick?: () => void;
};
