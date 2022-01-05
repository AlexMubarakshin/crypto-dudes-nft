/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import classnames from 'classnames/bind';

import style from './input.module.css';

const cx = classnames.bind(style);

type Props = {
  onTextChange?: (text: string) => void;
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Input: React.FC<Props> = ({
// eslint-disable-next-line react/prop-types
  className,
  // eslint-disable-next-line react/prop-types
  onChange,
  onTextChange,
  ...props
}) => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }

    if (onTextChange) {
      onTextChange(e.target.value);
    }
  };

  return (
    <input
      className={cx('input', className)}
      onChange={onChangeHandler}
      {...props}
    />
  );
};
export default Input;
