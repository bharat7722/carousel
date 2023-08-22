import React from 'react';

function SelectBox({ name, options, handleChange,id ,className,selectName}) {

  return (
    <select 
    name={name}
    onChange={handleChange} 
    className={className}
    id={id}
    >
      <option value="" hidden disabled>Select {selectName}</option>
      {options?.map((item, index) => (
        <option key={index} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
}

export default SelectBox;
