import { cn } from '#/lib/utils'
import { ProgressiveImg } from '../../atoms/ProgressiveImg/ProgressiveImg'

interface FlashCardProps {
  front: string
  back: string
  tag?: string
  isFlipped: boolean
  onClick?: () => void
  illustrationSrc?: string
  illustrationLqip?: string | null
}

export function FlashCard({ front, back, tag = 'FLASHCARD', isFlipped, onClick, illustrationSrc, illustrationLqip }: FlashCardProps) {
  return (
    <button
      type="button"
      className="[perspective:1000px] w-full bg-transparent border-none p-0 cursor-pointer text-left"
      onClick={onClick}
      aria-label={isFlipped ? 'Show front' : 'Show back'}
    >
      <div
        className={cn(
          'grid w-full [transform-style:preserve-3d] transition-transform duration-400 ease-in-out',
          isFlipped && '[transform:rotateY(180deg)]'
        )}
      >
        {/* Front face */}
        <div className="[grid-area:1/1] [backface-visibility:hidden] flex flex-col justify-center gap-4 p-8 px-6 border border-border bg-bg-card">
          <div className="inline-flex self-start px-2 py-1 bg-primary/7 text-xs font-semibold text-primary tracking-widest">
            {tag}
          </div>
          {illustrationSrc && (
            <ProgressiveImg
              src={illustrationSrc}
              lqip={illustrationLqip}
              alt=""
              width={1024}
              height={1024}
            />
          )}
          <p className="font-heading text-xl font-medium text-navy leading-snug m-0">{front}</p>
          <div className="flex items-center justify-center gap-1.5 text-text-muted text-sm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 2H3v16h5l3 3 3-3h7z"/>
              <path d="M12 8v4M12 16h.01"/>
            </svg>
            <span>Tap to reveal answer</span>
          </div>
        </div>

        {/* Back face */}
        <div className="[grid-area:1/1] [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col justify-center gap-4 p-8 px-6 border border-border bg-primary/5">
          <p className="font-heading text-xl font-medium text-navy leading-snug m-0 text-center w-full">{back}</p>
        </div>
      </div>
    </button>
  )
}
