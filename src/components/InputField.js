import React from 'react';
import { Mic } from 'lucide-react';

const InputField = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  icon: Icon,
  error,
  required = false,
  disabled = false,
  voiceInput = false,
  onVoiceClick,
  bilingual = false,
  odiaLabel,
  className = '',
  ...props
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-semibold text-textDark">
          {label}
          {bilingual && odiaLabel && (
            <span className="ml-2 text-gray-500 odia-text font-normal">
              ({odiaLabel})
            </span>
          )}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10">
            <Icon size={20} />
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            input-field
            ${Icon ? 'pl-12' : ''}
            ${voiceInput ? 'pr-12' : ''}
            ${error ? 'border-error focus:border-error' : ''}
            ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
          `}
          {...props}
        />
        {voiceInput && (
          <button
            type="button"
            onClick={onVoiceClick}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:text-primary-dark transition-colors"
            disabled={disabled}
          >
            <Mic size={20} />
          </button>
        )}
      </div>
      {error && <p className="text-sm text-error font-medium">{error}</p>}
    </div>
  );
};

export default InputField;
