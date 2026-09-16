import React, { useMemo } from 'react';
import katex from 'katex';

interface MathViewProps {
  math: string;
  block?: boolean;
  className?: string;
}

export const MathView: React.FC<MathViewProps> = ({ math, block = false, className = '' }) => {
  const html = useMemo(() => {
    if (!math || typeof math !== 'string') return '';
    try {
      return katex.renderToString(math, {
        displayMode: block,
        throwOnError: false,
        strict: false,
      });
    } catch {
      return math || '';
    }
  }, [math, block]);

  if (!math || typeof math !== 'string') return null;

  if (block) {
    return (
      <div 
        className={`my-2 overflow-x-auto text-slate-100 ${className}`} 
        dangerouslySetInnerHTML={{ __html: html }} 
      />
    );
  }

  return (
    <span 
      className={`inline-block px-1 align-baseline text-slate-100 ${className}`} 
      dangerouslySetInnerHTML={{ __html: html }} 
    />
  );
};

export default MathView;
