import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { Transaction } from "@/types/type";
import {
  RxArrowBottomLeft,
  RxArrowDown,
  RxChevronDown,
  RxArrowTopRight,
  RxReload,
} from "react-icons/rx";
import { TransactionsLoading } from "./Skeletons";
import NoMatch from "./NoMatch";

interface TransactionsBlockProps {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  handleReload: () => void;
  displayFilter: () => void;
  activeFilterCount: number;
  handleClearFilters: () => void;
}

const TransactionsBlock: React.FC<TransactionsBlockProps> = ({
  transactions,
  loading,
  error,
  handleReload,
  displayFilter,
  activeFilterCount,
  handleClearFilters,
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  // Show 0 if loading, error, or transactions is actually empty
  const transactionCount = loading || error ? 0 : transactions.length;

  return (
    <>
      <Card className="w-full">
        <div className="flex flex-col md:flex-row items-center justify-between pb-2">
          <div className="flex flex-col">
            <div className="text-lg md:text-xl font-bold text-nowrap">
              {/* Display count safely */}
              {transactionCount} Transaction{transactionCount !== 1 ? "s" : ""}
            </div>
            <p className="text-sm text-muted-foreground">
              {error
                ? "Could not load transaction data"
                : loading
                ? "Loading transactions..."
                : "Your transactions based on filters"}
            </p>
          </div>
          <div className="flex gap-1 md:gap-2">
            <Button
              variant={activeFilterCount > 0 ? `default` : `secondary`}
              className="group rounded-full hover:cursor-pointer "
              onClick={() => displayFilter()}
              disabled={loading || !!error}
            >
              Filter{" "}
              {activeFilterCount > 0 && (
                <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-black bg-white rounded-full transition-colors  ">
                  {activeFilterCount}
                </span>
              )}
              <RxChevronDown className="ml-2 transition-colors " />
            </Button>

            <Button
              variant="secondary"
              className="rounded-full"
              disabled={loading || !!error || transactionCount === 0}
            >
              {" "}
              Export List
              <RxArrowDown className="ml-2" />
            </Button>
          </div>
        </div>

        <CardContent>
          {/* --- Note: Order of Rendering --- */}
          {/* 1. Error State */}
          {error ? (
            <div className="text-center py-6">
              <p className="text-muted-foreground mb-4 font-medium">
                Failed to fetch transactions: <br />
                <span className="font-normal italic">{error}</span>
              </p>
              <Button
                variant="outline"
                className="flex items-center gap-2 mx-auto"
                onClick={handleReload}
              >
                <RxReload className="w-4 h-4" />
                Retry
              </Button>
            </div>
          ) : /* 2. Loading State */
          loading ? (
            <div className="flex justify-center py-6">
              <TransactionsLoading />
            </div>
          ) : /* 3. No Match State */
          transactions.length === 0 ? (
            <div className="text-center py-6">
              <NoMatch handleClearFilters={handleClearFilters} />
            </div>
          ) : (
            /* 4. Success State (Transactions List) */
            <ul className="space-y-4">
              {transactions.map((transaction, index) => {
                const { amount, metadata, status, type, date } = transaction;
                const productName = (metadata as { product_name?: string })
                  ?.product_name;
                const author = metadata?.name;
                const isDeposit = type === "deposit";
                const isSuccessful = status === "successful";

                return (
                  <li
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50"
                  >
                    {/* Left side: icon + text */}
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 md:w-10 md:h-10 rounded-full flex items-center justify-center ${
                          isDeposit ? "bg-green-100" : "bg-red-100"
                        }`}
                      >
                        {isDeposit ? (
                          <RxArrowBottomLeft className=" w-2 h-2 md:w-5 md:h-5 text-green-600" />
                        ) : (
                          <RxArrowTopRight className=" w-2 h-2 md:w-5 md:h-5 text-red-600" />
                        )}
                      </div>
                      <div>
                        {productName ? (
                          <>
                            <p className="font-medium text-sm md:text-base">
                              {productName}
                            </p>
                            {author && (
                              <p className="text-sm text-muted-foreground">
                                {author}
                              </p>
                            )}
                          </>
                        ) : (
                          <>
                            <p className="font-medium capitalize text-sm md:text-base">
                              {type}
                            </p>
                            {status && (
                              <div className="flex text-sm text-muted-foreground">
                                <span
                                  className={`capitalize ${
                                    isSuccessful
                                      ? "text-green-600"
                                      : "text-amber-600"
                                  }`}
                                >
                                  {status}
                                </span>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>

                    {/* Right side: amount + date */}
                    <div className="flex flex-col gap-0.5">
                      <span className="font-bold text-right text-sm md:text-base">
                        {formatCurrency(amount)}
                      </span>
                      <span className="text-muted-foreground text-xs md:text-sm text-nowrap">
                        {date ? format(new Date(date), "MMM d, yyyy") : "N/A"}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default TransactionsBlock;
