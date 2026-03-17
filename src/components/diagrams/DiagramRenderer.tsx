import React from 'react'
import { BoatAnatomyDiagram } from './BoatAnatomyDiagram'
import { RopeworkDiagram } from './RopeworkDiagram'
import { CompassDiagram } from './CompassDiagram'
import { TidesDiagram } from './TidesDiagram'
import { BuoyageDiagram } from './BuoyageDiagram'
import { ColregsDiagram } from './ColregsDiagram'
import { ChartworkDiagram } from './ChartworkDiagram'

const DIAGRAMS: Record<string, React.ComponentType> = {
  'boat-anatomy': BoatAnatomyDiagram,
  'ropework': RopeworkDiagram,
  'compass': CompassDiagram,
  'tides': TidesDiagram,
  'buoyage': BuoyageDiagram,
  'colregs': ColregsDiagram,
  'chartwork': ChartworkDiagram,
}

interface DiagramRendererProps {
  diagramId: string
}

export function DiagramRenderer({ diagramId }: DiagramRendererProps) {
  const Component = DIAGRAMS[diagramId]
  if (!Component) return null
  return <Component />
}
