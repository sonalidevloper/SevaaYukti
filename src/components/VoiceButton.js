import React from 'react';
import { Mic, MicOff } from 'lucide-react';

const VoiceButton = ({ isListening, onClick, size = 'large', className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`
        ${size === 'large' ? 'w-20 h-20' : 'w-12 h-12'}
        ${
          isListening
            ? 'bg-error animate-pulse-slow'
            : 'bg-primary hover:bg-primary-dark'
        }
        text-white rounded-full shadow-lg hover:shadow-xl
        transform hover:scale-105 active:scale-95
        transition-all duration-300
        flex items-center justify-center
        ${className}
      `}
      aria-label={isListening ? 'Stop listening' : 'Start voice input'}
    >
      {isListening ? (
        <MicOff className={size === 'large' ? 'w-8 h-8' : 'w-6 h-6'} />
      ) : (
        <Mic className={size === 'large' ? 'w-8 h-8' : 'w-6 h-6'} />
      )}
    </button>
  );
};

export default VoiceButton;
