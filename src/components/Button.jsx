import React from 'react';

function Button({ name, onClick, className, extraAttributes, disabled }) {
  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled}
      {...extraAttributes}>
      {name}
    </button>
  );
}
export default Button;
