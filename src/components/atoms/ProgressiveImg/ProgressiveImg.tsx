import { useState } from 'react'
import { cn } from '#/lib/utils'

interface ProgressiveImgProps {
  src: string
  lqip?: string | null
  alt: string
  // Intrinsic dimensions — browser uses these to reserve the correct space before
  // the image loads (aspect-ratio from width/height), preventing layout shift.
  // See https://web.dev/articles/optimize-cls#images-without-dimensions
  width: number
  height: number
  className?: string
}

export function ProgressiveImg({ src, lqip, alt, width, height, className }: ProgressiveImgProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="grid overflow-hidden">
      {lqip && (
        <img
          src={lqip}
          aria-hidden
          alt=""
          width={width}
          height={height}
          className={cn(
            '[grid-area:1/1] w-full h-auto scale-110 blur-lg transition-opacity duration-500',
            loaded ? 'opacity-0' : 'opacity-100',
            className,
          )}
        />
      )}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          '[grid-area:1/1] w-full h-auto transition-opacity duration-500',
          loaded ? 'opacity-100' : 'opacity-0',
          className,
        )}
        onLoad={() => setLoaded(true)}
      />
    </div>
  )
}
