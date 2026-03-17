import { useState } from 'react'
import styles from './KeyTermRow.module.css'

interface KeyTermRowProps {
  term: string
  definition: string
}

export function KeyTermRow({ term, definition }: KeyTermRowProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={styles.row}>
      <button className={styles.term} onClick={() => setIsOpen(!isOpen)}>
        {term}
        <span className={styles.chevron}>{isOpen ? '˅' : '›'}</span>
      </button>
      <div className={styles.definition} hidden={!isOpen}>
        <p>{definition}</p>
      </div>
    </div>
  )
}
