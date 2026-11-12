import React from 'react';

interface LSLogoProps {
  variant?: 'white' | 'badge' | 'plain';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const LSLogo: React.FC<LSLogoProps> = ({
  className = '',
  size = 'md',
}) => {
  // Height sizing for the official white LS증권 logo (/assets/aistudio/image_87540edb.png - 215x68 transparent PNG)
  const imgHeightClass =
    size === 'xl'
      ? 'h-10 sm:h-12'
      : size === 'lg'
      ? 'h-8 sm:h-9'
      : size === 'sm'
      ? 'h-5 sm:h-6'
      : 'h-5 sm:h-7.5';

  return (
    <div className={`inline-flex items-center shrink-0 select-none ${className}`}>
      <img
        src="/assets/aistudio/image_87540edb.png"
        alt="LS증권"
        className={`${imgHeightClass} w-auto object-contain block drop-shadow-sm`}
        draggable={false}
      />
    </div>
  );
};
