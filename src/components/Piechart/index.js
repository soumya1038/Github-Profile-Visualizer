// import React from 'react'
import {PieChart, Pie, Cell, Legend} from 'recharts'

const COLORS = [
  '#54CA76',
  '#31A4E6',
  '#F5C452',
  '#F2637F',
  '#9261F3',
  '#1322e7',
  '#c413e7',
  '#9ffd06',
  '#f3f70e',
  '#f7500e',
]

export default function Piechart({data}) {
  return (
    <PieChart width={380} height={380}>
      <Pie
        data={data}
        cx={150}
        cy={150}
        innerRadius={50}
        outerRadius={100}
        labelLine={false}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map(entry => (
          <Cell
            key={entry.name}
            fill={COLORS[data.indexOf(entry) % COLORS.length]}
          />
        ))}
      </Pie>
      <Legend layout="vertical" verticalAlign="middle" align="right" />
    </PieChart>
  )
}
