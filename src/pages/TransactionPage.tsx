import { TransactionTable } from "../components/Table/TransactionTable";

const TransactionPage = () => {
  return (
    <>
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-gray-800 text-center sm:text-left">
            Manage Transactions
          </h1>
          <p className="text-lg text-gray-600 mt-2 text-center sm:text-left">
            View, manage, and update all your transactions in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <div className="col-span-1 sm:col-span-2 lg:col-span-3">
            <TransactionTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionPage;
