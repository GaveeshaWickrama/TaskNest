import React from 'react';

const ErrorAlert = ({ message }) => (
  <div className="bg-red-100 border border-red-400 text-red-600 px-4 py-3 rounded relative my-4 text-center" role="alert">
    <span className="block sm:inline">{message}</span>
  </div>
);

export default ErrorAlert;
