"use client";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  // ResponsiveContainer,
} from "recharts";
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
  loading,
  walletData,
}: MainChartProps) {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(new Date(dateStr));
  };

  // Only get ticks if we have data
  const getTickValues = () => {
    if (chartData.length === 0) return [];
    if (chartData.length === 1) return [chartData[0]?.date];
    return [chartData[0]?.date, chartData[chartData.length - 1].date];
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-10 gap-2 md:gap-4 w-full">
      <Card className="w-full md:col-span-7">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-muted-foreground text-xs md:text-sm">
                Available Balance
              </CardTitle>
              <CardDescription
                className={
                  loading
                    ? "animate-pulse text-4xl font-bold"
                    : " text-xl md:text-4xl font-bold text-black"
                }
              >
                {loading ? (
                  <BalanceLoading />
                ) : walletData !== null ? (
                  `$${walletData?.balance}`
                ) : (
                  "N/A"
                )}
              </CardDescription>
            </div>
            <Button className="rounded-full">Withdraw</Button>
          </div>
        </CardHeader>
        <CardContent className="px-0 pb-0 h-48 md:h-64 w-full ml-2 md:m-4">
          <ChartContainer config={chartConfig} className="w-full h-full">
            {loading ? (
              <ChartLoading />
            ) : (
              // <ResponsiveContainer className="w-full">
              <LineChart
                accessibilityLayer
                data={chartData}
                margin={{ left: 10, right: 10, top: 5, bottom: 25 }}
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
                  className="text-md text-muted-foreground mx-10"
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
      <Card className="w-full md:col-span-3 rounded-0 shadow-none mt-0">
        <CardContent>
          {loading || !walletData ? (
            <BalanceDetailsLoading />
          ) : (
            <ul className="space-y-2">
              <li className="flex flex-col justify-between">
                <span className="capitalize text-muted-foreground text-xs md:text-sm">
                  Ledger Balance
                </span>
                <span className="font-bold text-lg md:text-2xl">
                  ${walletData.ledger_balance}
                </span>
              </li>
              <li className="flex flex-col justify-between">
                <span className="capitalize text-muted-foreground text-xs md:text-sm">
                  Total Payout
                </span>
                <span className="font-bold text-lg md:text-2xl">
                  ${walletData.total_payout}
                </span>
              </li>
              <li className="flex flex-col justify-between">
                <span className="capitalize text-muted-foreground text-xs md:text-sm">
                  Total Revenue
                </span>
                <span className="font-bold text-lg md:text-2xl">
                  ${walletData.total_revenue}
                </span>
              </li>
              <li className="flex flex-col justify-between">
                <span className="capitalize text-muted-foreground text-xs md:text-sm">
                  Pending Payout
                </span>
                <span className="font-bold text-lg md:text-2xl">
                  ${walletData.pending_payout}
                </span>
              </li>
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
