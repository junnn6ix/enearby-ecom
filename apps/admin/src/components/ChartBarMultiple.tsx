"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { OrderChartType } from "@repo/types";
import { use } from "react";

export const description = "A multiple bar chart";

// const chartData = [
//   { month: "June", total: 214, successful: 140 },
//   { month: "July", total: 181, successful: 89 },
//   { month: "August", total: 181, successful: 120 },
//   { month: "September", total: 263, successful: 206 },
//   { month: "October", total: 337, successful: 178 },
//   { month: "November", total: 283, successful: 206 },
//   { month: "Decemeber", total: 468, successful: 387 },
// ];

const chartConfig = {
  total: {
    label: "Total",
    color: "var(--chart-1)",
  },
  successful: {
    label: "Successful",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

export function ChartBarMultiple({
  title,
  dataPromise,
}: {
  title: string;
  dataPromise: Promise<OrderChartType[]>;
}) {
  const chartData = use(dataPromise);

  return (
    <div className="p-2">
      <div className="mb-4">
        <h1 className="text-lg font-medium">{title}</h1>
      </div>

      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis tickLine={false} tickMargin={10} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="total" fill="var(--color-total)" radius={4} />
          <Bar dataKey="successful" fill="var(--color-successful)" radius={4} />
        </BarChart>
      </ChartContainer>

      <div className="flex-col items-start gap-4 text-sm mt-4">
        <div className="grid gap-2">
          <div className="flex gap-2 leading-none font-medium">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="text-muted-foreground leading-none">
            Showing total visitors for the last 6 months
          </div>
        </div>
      </div>
    </div>
  );
}
