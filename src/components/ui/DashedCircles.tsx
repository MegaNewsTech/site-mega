'use client'

import './DashedCircles.scss'

type Circle = {
  size: number
  top?: string
  bottom?: string
  left?: string
  right?: string
}

const CIRCLES: Circle[] = [
  { top: '6%', left: '8%', size: 120 },
  { top: '14%', right: '10%', size: 86 },
  { top: '38%', left: '2%', size: 160 },
  { bottom: '22%', right: '4%', size: 140 },
  { bottom: '8%', left: '18%', size: 72 },
  { top: '58%', right: '22%', size: 52 },
  { top: '72%', left: '42%', size: 96 },
]

export default function DashedCircles() {
  return (
    <div className="auth-circles" aria-hidden="true">
      {CIRCLES.map((circle, i) => (
        <span
          key={i}
          className="auth-circles__item"
          style={{
            width: circle.size,
            height: circle.size,
            top: circle.top,
            bottom: circle.bottom,
            left: circle.left,
            right: circle.right,
          }}
        />
      ))}
    </div>
  )
}
