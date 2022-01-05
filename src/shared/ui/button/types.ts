import React from 'react';

export type ButtonVariant = 'contained' | 'outlined' | 'text';

export type ButtonProps = {
  className?: string;
  disabled?: boolean;

  variant?: ButtonVariant;
  style?: React.CSSProperties;

  onClick?: () => void;
};
