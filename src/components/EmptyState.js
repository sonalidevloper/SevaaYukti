import React from 'react';
import Button from './Button';

const EmptyState = ({ 
  icon, 
  title, 
  message, 
  actionButton, 
  onAction,
  type = 'default',
  iconComponent: IconComponent,
  size = 'normal'
}) => {
  const colors = {
    default: 'text-gray-500',
    success: 'text-success',
    warning: 'text-warning',
    error: 'text-error'
  };

  const sizes = {
    small: {
      container: 'py-8',
      icon: 'text-4xl',
      title: 'text-lg',
      message: 'text-sm'
    },
    normal: {
      container: 'py-12',
      icon: 'text-6xl',
      title: 'text-xl',
      message: 'text-base'
    },
    large: {
      container: 'py-16',
      icon: 'text-8xl',
      title: 'text-2xl',
      message: 'text-lg'
    }
  };

  const sizeClass = sizes[size];

  return (
    <div className={`flex flex-col items-center justify-center ${sizeClass.container} px-4 text-center`}>
      {IconComponent ? (
        <IconComponent size={size === 'small' ? 40 : size === 'large' ? 80 : 60} className={`mb-4 ${colors[type]} opacity-50`} />
      ) : icon ? (
        <div className={`${sizeClass.icon} mb-4 ${colors[type]} opacity-70`}>
          {icon}
        </div>
      ) : null}
      
      <h3 className={`${sizeClass.title} font-semibold text-textDark mb-2`}>
        {title}
      </h3>
      
      <p className={`${sizeClass.message} text-gray-600 mb-6 max-w-md`}>
        {message}
      </p>
      
      {actionButton && onAction && (
        <Button 
          variant="primary"
          onClick={onAction}
        >
          {actionButton}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
