"use client";
import { useEffect, useState } from "react";
import MainChart from "@/components/MainChart";
import TransactionsBlock from "../../components/TransactionsBlock";
import { Transaction } from "@/types/type";
import FilterCard from "@/components/FilterCard";
// import FilterCard from "@/components/FilterCard";

interface DataType {
  date: string;
  amount: number;
}

interface DateFilter {
  startDate: Date | undefined;
  endDate: Date | undefined;
}

interface Filters {
  dateRange: DateFilter;
  transactionTypes: string[];
  transactionStatus: string[];
}

export default function Revenue() {
  const [chartData, setChartData] = useState<DataType[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    dateRange: { startDate: undefined, endDate: undefined },
    transactionTypes: [],
    transactionStatus: [],
  });

  const [walletData, setWalletData] = useState<Record<string, number> | null>(
    null
  );

  // Toggle filter display
  const displayFilter = () => {
    setShowFilter(!showFilter);
  };

  // Apply filters to transactions
  const applyFilters = () => {
    if (!transactions.length) return;

    let results = [...transactions];
    const { dateRange, transactionTypes, transactionStatus } = filters;

    // Filter by date range
    if (dateRange.startDate || dateRange.endDate) {
      results = results.filter((txn) => {
        const txnDate = new Date(txn.date);

        // Check start date
        if (dateRange.startDate && txnDate < dateRange.startDate) {
          return false;
        }

        // Check end date
        if (dateRange.endDate) {
          const endOfDay = new Date(dateRange.endDate);
          endOfDay.setHours(23, 59, 59, 999);
          if (txnDate > endOfDay) {
            return false;
          }
        }

        return true;
      });
    }

    // Filter by transaction type
    if (transactionTypes.length > 0) {
      results = results.filter((txn) => transactionTypes.includes(txn.type));
    }

    // Filter by transaction status
    if (transactionStatus.length > 0) {
      results = results.filter((txn) => transactionStatus.includes(txn.status));
    }

    setFilteredTransactions(results);
  };

  // Handle filter updates
  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      dateRange: { startDate: undefined, endDate: undefined },
      transactionTypes: [],
      transactionStatus: [],
    });
    setFilteredTransactions(transactions);
  };

  useEffect(() => {
    // Apply filters whenever filters change
    applyFilters();
  }, [filters, transactions]);

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

        // console.log("Wallet Data:", walletRes);
        // console.log("Transaction Data:", txnRes);

        // setBalance(walletRes.balance);
        setWalletData(walletRes);
        setTransactions(txnRes);
        setFilteredTransactions(txnRes);

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

  // console.log("filters", filters);

  const activeFilterCount =
    (filters.dateRange.startDate ? 1 : 0) +
    (filters.dateRange.endDate ? 1 : 0) +
    filters.transactionTypes.length +
    filters.transactionStatus.length;

  return (
    <div className="mt-24 px-2 md:flex flex-col gap-2 md:gap-4 md:mx-8">
      <section className="w-auto">
        <MainChart
          chartData={chartData}
          // balance={balance}
          loading={loading}
          walletData={walletData}
        />
      </section>
      <section className="w-full mt-2 md:4">
        <TransactionsBlock
          transactions={filteredTransactions}
          loading={loading}
          displayFilter={displayFilter}
          activeFilterCount={activeFilterCount}
        />
      </section>
      {showFilter && (
        <div className="fixed inset-0 bg-white/20 backdrop-blur-sm z-40">
          <FilterCard
            displayFilter={displayFilter}
            onApplyFilters={handleFilterChange}
            onClearFilters={clearFilters}
            currentFilters={filters}
            activeFilterCount={activeFilterCount}
          />
        </div>
      )}
    </div>
  );
}
