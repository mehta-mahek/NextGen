import { Card } from "@/components/ui/card"
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react'
import { cn } from "@/lib/utils"

interface MetricCardProps {
  title: string
  value: number
  change: number
  period?: string
}

export function MetricCard({ title, value, change, period = "vs last month" }: MetricCardProps) {
  const isPositive = change > 0

  return (
    <Card className="bg-white/10 backdrop-blur-lg border-0">
      <div className="p-6">
        <h3 className="text-sm font-medium text-gray-200">{title}</h3>
        <div className="mt-2 flex items-baseline gap-4">
          <p className="text-3xl font-semibold text-white">{value.toLocaleString()}</p>
          <div
            className={cn(
              "flex items-center text-sm",
              isPositive ? "text-green-400" : "text-red-400"
            )}
          >
            {isPositive ? (
              <ArrowUpIcon className="h-4 w-4" />
            ) : (
              <ArrowDownIcon className="h-4 w-4" />
            )}
            <span>{Math.abs(change)}% {period}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}

