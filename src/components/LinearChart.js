import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts'

export default function LinearChart({quarterCommitCount}) {
  return (
    <div>
      <LineChart
        data={quarterCommitCount}
        width={900}
        height={380}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="quarterCommitCount"
          stroke="#8884d8"
          activeDot={{r: 8}}
        />
      </LineChart>
    </div>
  )
}
