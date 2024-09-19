import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
      <p className="text-lg mb-6">Sorry, the page you're looking for doesn't exist.</p>
      <Link 
        to="/" 
        className="px-4 py-2 bg-white text-gray-900 rounded hover:bg-gray-200 transition"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
