const StatsCard = ({
  title,
  count,
  icon,
  bgColor,
}: {
  title: string;
  count: string;
  icon: JSX.Element;
  bgColor: string;
}) => {
  return (
    <div
      className={`p-6 rounded-lg shadow-lg text-white flex items-center ${bgColor}`}
    >
      <div className="p-4 bg-white rounded-lg text-black">{icon}</div>
      <div className="ml-4">
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-2xl font-bold">{count}</p>
      </div>
    </div>
  );
};

export default StatsCard;
