import React from 'react';

interface LoaderProps {
  isLoading: boolean;
}

const Loader: React.FC<LoaderProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gradient-to-r from-[#badeae] via-[#ffffff] to-[#badeae]">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#8f35a5]"></div>
    </div>
  );
};

export default Loader;