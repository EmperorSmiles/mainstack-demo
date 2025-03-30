"use client";
import { useEffect, useState } from "react";
import MainChart from "@/components/MainChart";
import TransactionsBlock from "../../components/TransactionsBlock";
import { Transaction } from "@/types/type";
import FilterCard from "@/components/FilterCard";

interface DataType {
  date: string;
  amount: number;
}

export default function Revenue() {
  const [chartData, setChartData] = useState<DataType[]>([]);
  const [balance, setBalance] = useState<number | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [walletData, setWalletData] = useState<Record<string, number> | null>(
    null
  );

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
        setWalletData(walletRes);
        setTransactions(txnRes);

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

  return (
    <div className="mt-24 px-4 md:px-8 mx-auto max-w-screen-xl grid grid-cols-1 gap-6 md:gap-8 md:mx-8">
      <section className="w-full my-4 md:my-8">
        <MainChart
          chartData={chartData}
          balance={balance}
          loading={loading}
          walletData={walletData}
        />
      </section>
      <section className="w-full mt-6 md:mt-34">
        <TransactionsBlock transactions={transactions} loading={loading} />
      </section>
      <FilterCard />
    </div>
  );
}
