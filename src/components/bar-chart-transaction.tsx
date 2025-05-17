// components/charts/bar-chart-transactions.tsx
"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// components/charts/bar-chart-transactions.tsx

// components/charts/bar-chart-transactions.tsx

const chartConfig = {
  inflow: {
    label: "Inflow",
    color: "hsl(var(--chart-1))",
  },
  outflow: {
    label: "Outflow",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function BarChartTransaction({
  data,
}: {
  data: { month: string; inflow: number; outflow: number }[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cashflow</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="inflow" fill="#05df72" radius={4} />
            <Bar dataKey="outflow" fill="#F44336" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing cashflow for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
