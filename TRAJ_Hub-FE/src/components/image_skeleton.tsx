import { useState } from 'react';
import Skeleton from './skeleton';

type ImageWithSkeletonProps = {
  src: string;
  alt: string;
  className?: string;
};

const ImageWithSkeleton = ({ src, alt, className }: ImageWithSkeletonProps) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className={className}>
      {loading && <Skeleton />}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoading(false)}
        className={`transition-opacity duration-500 ease-in-out ${loading ? 'opacity-0' : 'opacity-100'}`}
        style={{ display: loading ? 'none' : 'block' }}
      />
    </div>
  );
};

export default ImageWithSkeleton;
