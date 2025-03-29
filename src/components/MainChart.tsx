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
import { useEffect, useState } from "react";

interface Transaction {
  date: string;
  amount: number;
  [key: string]: unknown; // For any other properties that might exist
}

interface DataType {
  date: string;
  amount: number;
}

// Chart config
const chartConfig = {
  amount: {
    label: "Transaction Amount",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function MainChart() {
  const [chartData, setChartData] = useState<DataType[]>([]);
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [walletRes, txnRes] = await Promise.all([
          fetch("https://fe-task-api.mainstack.io/wallet").then((res) =>
            res.json()
          ),
          fetch("https://fe-task-api.mainstack.io/transactions").then((res) =>
            res.json()
          ),
        ]);

        console.log("Wallet Data:", walletRes);
        console.log("Transaction Data:", txnRes);

        setBalance(walletRes.balance);

        // Convert transaction amounts into chart data
        const formattedData = txnRes
          .filter((txn: Transaction) => txn.date)
          .map((txn: Transaction) => ({
            date: new Date(txn.date).toISOString().split("T")[0],
            amount: txn.amount,
          }))
          .sort(
            (a: DataType, b: DataType) =>
              new Date(a.date).getTime() - new Date(b.date).getTime()
          );

        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
    <Card className="w-auto h-72 mx-4">
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
              {loading
                ? "Loading..."
                : balance !== null
                ? `$${balance}`
                : "N/A"}
            </CardDescription>
          </div>
          <Button className="rounded-full">Withdraw</Button>
        </div>
      </CardHeader>
      <CardContent className=" px-0 pb-0">
        <ChartContainer config={chartConfig} className="h-full">
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
            {/* <YAxis /> */}
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
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
