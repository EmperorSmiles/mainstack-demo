import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Transaction } from "@/types/type";

interface TransactionsBlockProps {
  transactions: Transaction[];
  loading: boolean;
}

const TransactionsBlock: React.FC<TransactionsBlockProps> = ({
  transactions,
  loading,
}) => {
  const getTransactionName = (transaction: Transaction) => {
    return transaction.metadata?.name || transaction.type || "Transaction";
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-xl font-bold">
            {transactions.length} Transactions
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Your transactions for the last 7 days
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Filter</Button>
          <Button variant="outline">Export List</Button>
        </div>
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="flex justify-center py-6">
            <p>Loading transactions...</p>
          </div>
        ) : transactions.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-muted-foreground">No transactions available</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {transactions.map((transaction) => (
              <li
                key={transaction.payment_reference}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.status === "successful"
                        ? "bg-green-100"
                        : "bg-red-100"
                    }`}
                  >
                    <span
                      className={
                        transaction.status === "successful"
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {transaction.status === "successful" ? "✔" : "✖"}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">
                      {getTransactionName(transaction)}
                    </p>
                    <div className="flex gap-2 text-sm text-muted-foreground">
                      <span>
                        {format(new Date(transaction.date), "MMM d, yyyy")}
                      </span>
                      {transaction.status && (
                        <>
                          <span>•</span>
                          <span
                            className={`capitalize ${
                              transaction.status === "successful"
                                ? "text-green-600"
                                : "text-amber-600"
                            }`}
                          >
                            {transaction.status}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <span className="font-bold text-right">
                  {formatCurrency(transaction.amount)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionsBlock;
