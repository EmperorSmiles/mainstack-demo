"use client";
import { useCallback, useEffect, useState } from "react";
import MainChart from "@/components/MainChart";
import TransactionsBlock from "../../components/TransactionsBlock";
import { Transaction } from "@/types/type";
import FilterCard from "@/components/FilterCard";

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
  const [fetchError, setFetchError] = useState<string | null>(null);
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
  // const filterRef = useRef<HTMLDivElement>(null);

  // I should probably clean this up and move a bit but it works fine for now and the goal is to present a working demo

  const displayFilter = useCallback(() => {
    setShowFilter(!showFilter);
  }, [showFilter]);

  const applyFilters = useCallback(() => {
    if (!transactions.length) {
      setFilteredTransactions([]);
      return;
    }

    let results = [...transactions];
    const { dateRange, transactionTypes, transactionStatus } = filters;

    // Filter by date range
    if (dateRange.startDate || dateRange.endDate) {
      results = results.filter((txn) => {
        const txnDate = new Date(txn.date);
        if (dateRange.startDate && txnDate < dateRange.startDate) return false;
        if (dateRange.endDate) {
          const endOfDay = new Date(dateRange.endDate);
          endOfDay.setHours(23, 59, 59, 999);
          if (txnDate > endOfDay) return false;
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
  }, [transactions, filters]);

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  // Clear all filters
  const clearFilters = useCallback(() => {
    setFilters({
      dateRange: { startDate: undefined, endDate: undefined },
      transactionTypes: [],
      transactionStatus: [],
    });

    // setFilteredTransactions(transactions);
  }, []);

  // --- Fetch Data Logic ---
  const fetchData = useCallback(async () => {
    // chore: Wrap in useCallback☑️
    setLoading(true);
    setFetchError(null);
    // clear previous data while loading to prevent stale display
    setTransactions([]);
    setFilteredTransactions([]);
    setWalletData(null);
    setChartData([]);
    try {
      const [walletRes, txnRes] = await Promise.all([
        fetch("https://fe-task-api.mainstack.io/wallet").then((res) => {
          if (!res.ok)
            throw new Error(`Wallet fetch failed: ${res.statusText}`);
          return res.json();
        }),
        fetch("https://fe-task-api.mainstack.io/transactions").then((res) => {
          if (!res.ok)
            throw new Error(`Transactions fetch failed: ${res.statusText}`);
          //  Simulate an error for testing
          // throw new Error("Simulated fetch error");
          // End simulation
          return res.json();
        }),
      ]);

      // Ensure txnRes is an array, even if API returns something else unexpectedly
      const safeTxnRes = Array.isArray(txnRes) ? txnRes : [];

      setWalletData(walletRes);
      setTransactions(safeTxnRes);

      const formattedData = safeTxnRes
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
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      setFetchError(errorMessage);
      setTransactions([]);
      setFilteredTransactions([]);
      setWalletData(null);
      setChartData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  //  Effect for Initial Fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Effect to Apply Filters
  useEffect(() => {
    if (!loading && !fetchError) {
      applyFilters();
    } else if (fetchError) {
      setFilteredTransactions([]);
    }
  }, [filters, transactions, loading, fetchError, applyFilters]);

  // Calculate active filter count
  const activeFilterCount =
    (filters.dateRange.startDate ? 1 : 0) +
    (filters.dateRange.endDate ? 1 : 0) +
    filters.transactionTypes.length +
    filters.transactionStatus.length;

  return (
    <div
      className="mt-24 px-2 md:flex flex-col gap-2 md:gap-4 md:mx-8"
      // ref={filterRef}
    >
      <section className="w-auto">
        <MainChart
          chartData={chartData}
          loading={loading}
          walletData={walletData}
          error={fetchError}
        />
      </section>
      <section className="w-full mt-2 md:4">
        <TransactionsBlock
          transactions={filteredTransactions}
          loading={loading}
          error={fetchError}
          handleReload={fetchData}
          displayFilter={displayFilter}
          activeFilterCount={activeFilterCount}
          handleClearFilters={clearFilters}
        />
      </section>
      {showFilter && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 flex items-center justify-center">
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
