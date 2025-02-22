import { IoBusiness, IoCash, IoWallet } from "react-icons/io5";
import StatsCard from "../components/Card/StatisticsCard";
import TransactionsChart from "../components/Chart/TransactionChart";

const HomePage = () => {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Properties"
          count="12"
          icon={<IoBusiness size={30} />}
          bgColor="bg-blue-300"
        />
        <StatsCard
          title="Total Transactions"
          count="35"
          icon={<IoCash size={30} />}
          bgColor="bg-green-300"
        />
        <StatsCard
          title="Total Credit"
          count="10"
          icon={<IoWallet size={30} />}
          bgColor="bg-red-300"
        />
        <StatsCard
          title="Total Debit"
          count="15"
          icon={<IoWallet size={30} />}
          bgColor="bg-purple-300"
        />
      </div>

      <TransactionsChart />
    </div>
  );
};

export default HomePage;
