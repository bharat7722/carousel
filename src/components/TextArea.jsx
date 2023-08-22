import React from 'react';

function TextArea({ className, value, handleChange, placeholder, name, id, inputRef }) {
  return (
    <textarea
      className={className}
      value={value}
      placeholder={placeholder}
      name={name}
      id={id}
      onChange={handleChange}
      ref={inputRef}
    />
  );
}

export default TextArea;
