import React from 'react';

const FeatureCard = ({ icon: Icon, title, description, className = '', onClick }) => {
  return (
    <div className={`card group cursor-pointer ${className}`} onClick={onClick}>
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-br from-primary-light to-primary rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md">
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-lg font-bold text-textDark group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
