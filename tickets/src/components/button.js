// src/components/ui/Button.js
import React from 'react';

export function Button({ className, children, onClick }) {
  return (
    <button
      className={`px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg transform transition-all duration-300 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
