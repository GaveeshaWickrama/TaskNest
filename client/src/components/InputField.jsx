import React from 'react';

const InputField = ({ id, name, type, value, onChange, placeholder, IconComponent }) => (
  <div className="relative mb-8">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      {IconComponent && <IconComponent className="text-gray-400" />}
    </div>
    <input
      autoComplete="off"
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className="peer placeholder-transparent h-10 w-full pl-10 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-500"
      placeholder={placeholder}
      required
    />
    <label
      htmlFor={id}
      className="absolute left-10 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
    >
      {placeholder}
    </label>
  </div>
);

export default InputField;

