import React from 'react';

function Input({ className, value, handleChange, type, defaultValue, placeholder, name, id, role, checked ,accept}) {
  return (
    <input
      type={type}
      onChange={(e) => handleChange && handleChange(e)}
      value={value}
      className={className}
      defaultValue={defaultValue}
      checked={checked}
      placeholder={placeholder}
      role={role}
      id={id}
      name={name}
      accept={accept}
    />
  );
}

export default Input;
