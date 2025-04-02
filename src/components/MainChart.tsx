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
import { RxExclamationTriangle } from "react-icons/rx";

interface DataType {
  date: string;
  amount: number;
}

interface MainChartProps {
  chartData: DataType[];
  loading: boolean;
  walletData: Record<string, number> | null;
  error: string | null;
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
  error,
}: MainChartProps) {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(new Date(dateStr));
  };

  const getTickValues = () => {
    if (chartData.length === 0 || error) return [];
    if (chartData.length === 1) return [chartData[0]?.date];
    return [chartData[0]?.date, chartData[chartData.length - 1].date];
  };
  const ErrorDisplay = ({ message }: { message: string }) => (
    <div className="flex flex-col h-full items-center justify-center text-muted-foreground p-4 text-center">
      <RxExclamationTriangle className="w-6 h-6 mb-2" />
      <p className="text-sm font-medium">Failed to load data</p>
      <p className="text-xs italic">{message}</p>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-10 gap-2 md:gap-4 w-full">
      <Card className="w-full md:col-span-7">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-muted-foreground text-xs md:text-sm">
                Available Balance
              </CardTitle>
              
              {error ? (
                <CardDescription className="text-muted-foreground text-xl md:text-2xl font-semibold flex items-center gap-1 pt-1">
                  <RxExclamationTriangle /> Error
                </CardDescription>
              ) : loading ? (
                <CardDescription className="animate-pulse text-xl md:text-4xl font-bold">
                  <BalanceLoading />
                </CardDescription>
              ) : walletData !== null ? (
                <CardDescription className="text-xl md:text-4xl font-bold text-black">
                  USD{" "}
                  {walletData?.balance.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </CardDescription>
              ) : (
                <CardDescription className="text-xl md:text-4xl font-bold text-muted-foreground">
                  N/A
                </CardDescription>
              )}
            </div>
            <Button
              className="rounded-full"
              disabled={loading || !!error || !walletData}
            >
              {" "}
              Withdraw
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-0 pb-0 h-48 md:h-64 w-full ml-2 md:m-4">
          <ChartContainer config={chartConfig} className="w-full h-full">
            {/* --- Chart Area Logic --- */}
            {error ? (
              <div className="flex h-full items-center justify-center text-muted-foreground p-4 text-center text-sm">
                <RxExclamationTriangle className="w-5 h-5 mr-2" /> Chart data
                unavailable due to an error.
              </div>
            ) : loading ? (
              <ChartLoading />
            ) : chartData.length > 0 ? (
              <LineChart
                accessibilityLayer
                data={chartData}
                margin={{ left: 10, right: 10, top: 5, bottom: 25 }}
              >
                <CartesianGrid vertical={false} />{" "}
                <XAxis
                  dataKey="date"
                  // tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={formatDate}
                  ticks={getTickValues()}
                  interval={0}
                  minTickGap={10} 
                  padding={{ left: 10, right: 10 }}
                  className="text-xs text-muted-foreground"
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
                  dot={false}
                  activeDot={{ r: 4 }}
                />
              </LineChart>
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground">
                No transaction data for the selected period.
              </div>
            )}
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="w-full md:col-span-3 rounded-0 shadow-none mt-0">
        <CardContent className="pt-4 md:pt-6">
          {error ? (
            <ErrorDisplay message={error} />
          ) : loading ? (
            <BalanceDetailsLoading />
          ) : walletData ? (
            <ul className="space-y-4">
              {" "}
              <li className="flex flex-col justify-between">
                <span className="capitalize text-muted-foreground text-xs md:text-sm mb-0.5">
                  Ledger Balance
                </span>
                <span className="font-bold text-lg md:text-xl">
                  {" "}
                  USD{" "}
                  {walletData.ledger_balance.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </li>
              <li className="flex flex-col justify-between">
                <span className="capitalize text-muted-foreground text-xs md:text-sm mb-0.5">
                  Total Payout
                </span>
                <span className="font-bold text-lg md:text-xl">
                  USD{" "}
                  {walletData.total_payout.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </li>
              <li className="flex flex-col justify-between">
                <span className="capitalize text-muted-foreground text-xs md:text-sm mb-0.5">
                  Total Revenue
                </span>
                <span className="font-bold text-lg md:text-xl">
                  USD{" "}
                  {walletData.total_revenue.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </li>
              <li className="flex flex-col justify-between">
                <span className="capitalize text-muted-foreground text-xs md:text-sm mb-0.5">
                  Pending Payout
                </span>
                <span className="font-bold text-lg md:text-xl">
                  USD{" "}
                  {walletData.pending_payout.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </li>
            </ul>
          ) : (
            <p className="text-muted-foreground text-center p-4">
              Wallet details not available.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
