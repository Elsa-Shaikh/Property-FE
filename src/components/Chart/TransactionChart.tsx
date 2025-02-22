import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const TransactionsChart = () => {
  const data = [
    { name: "Property A", transactions: 2 },
    { name: "Property B", transactions: 5 },
    { name: "Property C", transactions: 7 },
    { name: "Property D", transactions: 3 },
    { name: "Property E", transactions: 8 },
    { name: "Property F", transactions: 4 },
  ];

  return (
    <div className="bg-white shadow-lg p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Properties & Transactions</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="transactions" fill="#3A4668" barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TransactionsChart;
