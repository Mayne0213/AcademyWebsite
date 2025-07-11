'use client'

import React, { useMemo } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Legend, LabelList,
  CartesianGrid, PieChart, Pie, Cell
} from 'recharts'

type AttendanceItem = {
  attendanceStatus: '출석' | '지각' | '결석' | '인강'
}

type Props = {
  attendanceData: AttendanceItem[]
  type: 'Circle' | 'Bar'
}

const COLORS = {
  출석: '#34d399',
  지각: '#a78bfa',
  결석: '#f87171',
  인강: '#bfdbfe',
}

export default function AttendanceStatusChart({ attendanceData, type }: Props) {
  const statusCount = useMemo(() => {
    return attendanceData.reduce(
      (acc, curr) => {
        acc[curr.attendanceStatus] += 1
        return acc
      },
      { 출석: 0, 지각: 0, 결석: 0, 인강: 0 }
    )
  }, [attendanceData])

  const totalCount =
    statusCount['출석'] + statusCount['지각'] + statusCount['결석'] + statusCount['인강'] || 1

  const chartData = [
    { name: '출석', value: statusCount['출석'] },
    { name: '지각', value: statusCount['지각'] },
    { name: '결석', value: statusCount['결석'] },
    { name: '인강', value: statusCount['인강'] },
  ]

  if (type === 'Circle') {
    return (
      <ResponsiveContainer width="100%" height={450}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={200}
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
          >
            {chartData.map((entry) => (
              <Cell
                key={`cell-${entry.name}`}
                fill={COLORS[entry.name as keyof typeof COLORS]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    )
  }

  // Bar 차트 렌더링
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart
        data={[{ name: '', ...statusCount }]}
        layout="vertical"
        margin={{ top: 20, right: 30, bottom: 5 }}
      >
        <CartesianGrid stroke="none" />
        <XAxis type="number" allowDecimals={false} />
        <YAxis type="category" tick={false} width={1} />
        <Legend layout="vertical" align="left" verticalAlign="middle" />

        {(['출석', '지각', '결석', '인강'] as const).map((key) => (
          <Bar
            key={key}
            dataKey={key}
            stackId="a"
            fill={COLORS[key]}
            barSize={40}
          >
            <LabelList
              dataKey={key}
              position="top"
              content={({ x, y, width, height }) => (
                <text
                  x={Number(x) + Number(width) / 2}
                  y={Number(y) + 5 + Number(height) / 2}
                  textAnchor="middle"
                  fill="#000000"
                  className={`text-xs ${((statusCount[key] / totalCount) * 100).toFixed(0) === '0' ? "hidden" : ""}`}
                >
                  {`${((statusCount[key] / totalCount) * 100).toFixed(0)}%`}
                </text>
              )}
            />
          </Bar>
        ))}
      </BarChart>
    </ResponsiveContainer>
  )
}
