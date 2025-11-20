import React from "react";
import './Button.css';

function Button({ children, onClick, className, text, ...rest }) {
  return (
    <button className={`mc-button ${className || ''}`.trim()} onClick={onClick} {...rest}>
      {text || children}
    </button>
  );
}

export default Button;
