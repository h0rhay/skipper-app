import type { FC } from 'react'
import { registryEntries as t0102 } from './topics-01-02'
import { registryEntries as t0304 } from './topics-03-04'
import { registryEntries as t0506 } from './topics-05-06'
import { registryEntries as t0708 } from './topics-07-08'
import { registryEntries as t0910 } from './topics-09-10'
import { registryEntries as t1112 } from './topics-11-12'
import { registryEntries as t1314 } from './topics-13-14'
import { registryEntries as t151617 } from './topics-15-16-17'

const registry: Record<string, FC> = {
  ...t0102,
  ...t0304,
  ...t0506,
  ...t0708,
  ...t0910,
  ...t1112,
  ...t1314,
  ...t151617,
}

export function getIllustration(cardId: string): FC | null {
  return registry[cardId] ?? null
}
