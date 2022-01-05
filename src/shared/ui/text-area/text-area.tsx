/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import classnames from 'classnames/bind';

import style from './text-area.module.css';

const cx = classnames.bind(style);

type Props = {
  onTextChange?: (text: string) => void;
} & React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;

const TextArea: React.FC<Props> = ({
// eslint-disable-next-line react/prop-types
  className,
  // eslint-disable-next-line react/prop-types
  onChange,
  onTextChange,
  // eslint-disable-next-line react/prop-types
  rows = 5,
  ...props
}) => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e);
    }

    if (onTextChange) {
      onTextChange(e.target.value);
    }
  };

  return (
    <textarea
      className={cx('text-area', className)}
      onChange={onChangeHandler}
      rows={rows}
      {...props}
    />
  );
};

export default TextArea;
