import React from 'react';

import './button.css';

type Props = {
  onClick?: () => void;
};
const Button: React.FC<Props> = ({ children, onClick }) => (
  <button type="button" className="button" onClick={onClick}>
    {children}
  </button>
);

export default Button;
