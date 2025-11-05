import React from 'react'
import CalendarHeatmap from 'react-calendar-heatmap'
// import ReactTooltip from 'react-tooltip'

import 'react-calendar-heatmap/dist/styles.css'
import './index.css'

// 🎨 Custom color palette
const COLORS = [
  'Pink',
  '#00C49F',
  '#FFBB28',
  '#0088FE',
  '#F2637F',
  'Orange',
  'purple',
]

export default function CommitGraph({data = []}) {
  const today = new Date()
  const startDate = new Date(today)
  startDate.setDate(startDate.getDate() - 180) // last 6 months

  // 🔢 Calculate the max commit count for scaling
  const maxCount = Math.max(...data.map(d => d.count), 1)

  // 🎨 Get color intensity based on commit count
  const getColorForCount = count => {
    if (count === 0) return 'color-empty'
    const level = Math.min(
      COLORS.length - 1,
      Math.floor((count / maxCount) * (COLORS.length - 1)),
    )
    return `color-level-${level}`
  }

  return (
    <div className="commit-graph-container">
      <CalendarHeatmap
        startDate={startDate}
        endDate={today}
        values={data}
        classForValue={value =>
          value ? getColorForCount(value.count) : 'color-empty'
        }
        tooltipDataAttrs={value => ({
          'data-tip': `Commits: ${value.count || 0}`,
        })}
        showWeekdayLabels
      />
    </div>
  )
}
// <ReactTooltip />
