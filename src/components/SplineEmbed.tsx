import { Suspense } from 'react';

interface SplineEmbedProps {
  src: string;
  className?: string;
  fallback?: React.ReactNode;
}

export const SplineEmbed = ({ src, className = "", fallback }: SplineEmbedProps) => {
  const defaultFallback = (
    <div className={`bg-muted/50 glass rounded-lg flex items-center justify-center ${className}`}>
      <div className="text-center">
        <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-muted-foreground font-body">Loading 3D Scene...</p>
      </div>
    </div>
  );

  return (
    <Suspense fallback={fallback || defaultFallback}>
      <iframe
        src={src}
        className={`border-0 rounded-lg ${className}`}
        allowFullScreen
        loading="lazy"
        title="Interactive 3D Scene"
      />
    </Suspense>
  );
};