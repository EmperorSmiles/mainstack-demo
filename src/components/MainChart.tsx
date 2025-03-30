"use client";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import {
  BalanceDetailsLoading,
  BalanceLoading,
  ChartLoading,
} from "./Skeletons";

interface DataType {
  date: string;
  amount: number;
}

interface MainChartProps {
  chartData: DataType[];
  balance: number | null;
  loading: boolean;
  walletData: Record<string, number> | null;
}

// Chart config
const chartConfig = {
  amount: {
    label: "Transaction Amount",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function MainChart({
  chartData,
  balance,
  loading,
  walletData,
}: MainChartProps) {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(dateStr));
  };

  // Only get ticks if we have data
  const getTickValues = () => {
    if (chartData.length === 0) return [];
    if (chartData.length === 1) return [chartData[0]?.date];
    return [chartData[0]?.date, chartData[chartData.length - 1].date];
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-10 gap-4 md:gap-12 w-full h-11/12">
      {
        <Card className="w-full h-72 md:col-span-7 mb-6 md:mb-14">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Available Balance</CardTitle>
                <CardDescription
                  className={
                    loading
                      ? "animate-pulse text-4xl font-bold"
                      : "text-4xl font-bold"
                  }
                >
                  {loading ? (
                    <BalanceLoading />
                  ) : balance !== null ? (
                    `$${balance}`
                  ) : (
                    "N/A"
                  )}
                </CardDescription>
              </div>
              <Button className="rounded-full">Withdraw</Button>
            </div>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <ChartContainer config={chartConfig} className="h-full">
              {loading ? (
                <ChartLoading />
              ) : (
                <LineChart
                  accessibilityLayer
                  data={chartData}
                  margin={{ left: 40, right: 40, top: 5, bottom: 25 }}
                >
                  <CartesianGrid />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={formatDate}
                    ticks={getTickValues()}
                    interval={0}
                    minTickGap={0}
                    className="text-md text-muted-foreground"
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Line
                    dataKey="amount"
                    type="natural"
                    stroke="var(--color-chart-5)"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                </LineChart>
              )}
            </ChartContainer>
          </CardContent>
        </Card>
      }
      <Card className="w-full h-72 md:col-span-3 rounded-0 shadow-none mt-20 md:mt-0">
        <CardContent>
          {loading || !walletData ? (
            <BalanceDetailsLoading />
          ) : (
            <ul className="space-y-2">
              {Object.entries(walletData).map(([key, value]) => (
                <li key={key} className="flex flex-col justify-between">
                  <span className="capitalize text-muted-foreground">
                    {key.replace(/_/g, " ")}:
                  </span>
                  <span className="font-bold text-xl md:text-2xl">
                    ${value}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
