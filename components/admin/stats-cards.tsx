"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string | number
  description?: string
  trend?: {
    value: number
    label: string
    direction: "up" | "down" | "neutral"
  }
  icon: React.ReactNode
}

export function StatsCard({ title, value, description, trend, icon }: StatsCardProps) {
  const getTrendIcon = () => {
    switch (trend?.direction) {
      case "up":
        return <TrendingUp className="h-3 w-3" />
      case "down":
        return <TrendingDown className="h-3 w-3" />
      default:
        return <Minus className="h-3 w-3" />
    }
  }

  const getTrendColor = () => {
    switch (trend?.direction) {
      case "up":
        return "text-green-600"
      case "down":
        return "text-red-600"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {(description || trend) && (
          <div className="flex items-center gap-2 text-xs">
            {trend && (
              <Badge variant="outline" className={`${getTrendColor()} border-current`}>
                <span className="flex items-center gap-1">
                  {getTrendIcon()}
                  {trend.value > 0 ? "+" : ""}
                  {trend.value}
                </span>
              </Badge>
            )}
            <span className="text-muted-foreground">{trend?.label || description}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
