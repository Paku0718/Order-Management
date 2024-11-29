
import React from 'react';

interface LoadingSpinnerProps {
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ fullScreen }) => {
  return (
    <div 
      className={`flex justify-center items-center 
        ${fullScreen ? 'h-screen w-screen' : 'h-full w-full'}
        animate-fade-in`}
    >
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-primary-500"></div>
        <p className="mt-4 text-gray-600 text-sm">Loading data...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;