import React from 'react';

const AnimatedPageWrapper = ({ children }) => {
  return (
    <div className="animate-fade-slide-in">
      {children}
    </div>
  );
};

export default AnimatedPageWrapper;
