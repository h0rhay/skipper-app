import { useState } from 'react'
import { getTermPath } from '../../illustrations/paths'
import styles from './KeyTermRow.module.css'

interface KeyTermRowProps {
  term: string
  definition: string
}

export function KeyTermRow({ term, definition }: KeyTermRowProps) {
  const [isOpen, setIsOpen] = useState(false)
  const illustrationSrc = getTermPath(term)

  return (
    <div className={styles.row}>
      <button className={styles.term} onClick={() => setIsOpen(!isOpen)}>
        {term}
        <span className={styles.chevron}>{isOpen ? '˅' : '›'}</span>
      </button>
      <div className={styles.definition} hidden={!isOpen}>
        {illustrationSrc && (
          <div className={styles.illustration}>
            <img src={illustrationSrc} alt={term} width={200} height={200} />
          </div>
        )}
        <p>{definition}</p>
      </div>
    </div>
  )
}
