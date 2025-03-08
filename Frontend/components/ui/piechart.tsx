"use client";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";

const data = [
  { name: "Marketing", value: 15.2 },
  { name: "Sales", value: 18.2 },
  { name: "Finance", value: 12.1 },
  { name: "Human Resources", value: 9.1 },
  { name: "IT", value: 24.2 },
  { name: "Operations", value: 21.2 },
];

const COLORS: { [key in Department]: string } = {
  Marketing: "#FF6384",
  Sales: "#36A2EB",
  Finance: "#FFCE56",
  "Human Resources": "#4BC0C0",
  IT: "#9966FF",
  Operations: "#123456",
};

type Department =
  | "Marketing"
  | "Sales"
  | "Finance"
  | "Human Resources"
  | "IT"
  | "Operations";

export function DepartmentPieChart() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Employee Count by Department</CardTitle>
      </CardHeader>
      <CardContent className="p-(-6)">
        <ChartContainer
          className="h-[300px]"
          config={{
            marketing: {
              label: "Marketing",
              color: "#FF6384", // Hexadecimal color
            },
            sales: {
              label: "Sales",
              color: "#36A2EB", // Hexadecimal color
            },
            finance: {
              label: "Finance",
              color: "#FFCE56", // Hexadecimal color
            },
            hr: {
              label: "Human Resources",
              color: "#4BC0C0", // Hexadecimal color
            },
            it: {
              label: "IT",
              color: "#9966FF", // Hexadecimal color
            },
            operations: {
              label: "Operations",
              color: "#123456", // Hexadecimal color
            },
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(170, 170, 170, 0.5)",
              backdropFilter: "blur(10px)",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="35%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(1)}%`
                  }
                  outerRadius={70}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[entry.name as Department]}
                    />
                  ))}
                  ))
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
