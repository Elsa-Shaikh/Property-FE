import { NavLink, useNavigate } from "react-router-dom";
import { IoCash, IoBusiness, IoLogOut, IoHome, IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { logout } from "../Redux/authSlice";

const Sidebar = ({
  isOpen,
  toggleSidebar,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div>
      <div
        className={`w-64 h-screen bg-gray-900 text-white p-5 fixed sm:relative top-0 left-0 z-50 transition-transform duration-300 ease-in-out shadow-xl
        ${isOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Dashboard</h2>

          <button
            onClick={toggleSidebar}
            className="text-white sm:hidden hover:text-gray-300 transition duration-200"
          >
            <IoClose size={28} />
          </button>
        </div>

        <hr className="border-gray-600 mb-4" />

        <nav>
          <ul className="space-y-3">
            <SidebarLink
              to="/dashboard"
              icon={<IoHome />}
              label="Home"
              activeClass="bg-yellow-500 text-gray-900"
            />
            <SidebarLink
              to="/dashboard/properties"
              icon={<IoBusiness />}
              label="Properties"
              activeClass="bg-blue-500 text-white"
            />
            <SidebarLink
              to="/dashboard/transactions"
              icon={<IoCash />}
              label="Transactions"
              activeClass="bg-blue-500 text-white"
            />
            <li
              onClick={handleLogout}
              className="cursor-pointer flex items-center p-3 rounded-lg text-gray-300 hover:bg-red-500 hover:text-white transition"
            >
              <IoLogOut className="mr-3" /> Logout
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

const SidebarLink = ({
  to,
  icon,
  label,
  activeClass,
}: {
  to: string;
  icon: JSX.Element;
  label: string;
  activeClass: string;
}) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center p-3 rounded-lg transition ${
            isActive
              ? activeClass
              : "text-gray-300 hover:bg-gray-700 hover:text-white"
          }`
        }
      >
        <span className="mr-3">{icon}</span> {label}
      </NavLink>
    </li>
  );
};
export default Sidebar;
