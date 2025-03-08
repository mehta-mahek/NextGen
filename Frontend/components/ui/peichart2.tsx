"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

const data = [
  { name: "Active", value: 75 },
  { name: "Inactive", value: 25 }
]

export function PerformanceChart() {
  return (
    <Card className="bg-[#1a1a2f] text-white">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Performance Analysis</CardTitle>
      </CardHeader>
      <CardContent className="relative pt-4">
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center">
            <div className="text-4xl font-bold">1,000</div>
            <div className="text-sm text-gray-400">Active users</div>
          </div>
        </div>
        <ChartContainer
          className="h-[300px] mt-8"
          config={{
            active: {
              label: "Active Users",
              color: "hsl(250, 90%, 70%)",
            },
            inactive: {
              label: "Inactive Users",
              color: "hsl(250, 20%, 95%)",
            },
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={90}
                startAngle={90}
                endAngle={-270}
                dataKey="value"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={`var(--color-${entry.name.toLowerCase()})`}
                  />
                ))}
              </Pie>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={65}
                startAngle={90}
                endAngle={-270}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={`var(--color-${entry.name.toLowerCase()})`}
                    opacity={0.7}
                  />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltipContent />} />
              <Legend 
                verticalAlign="bottom" 
                height={36}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

