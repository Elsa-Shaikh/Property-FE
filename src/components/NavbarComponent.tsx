import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { IoMenu, IoClose } from "react-icons/io5";

const NavbarComponent = ({
  isOpen,
  toggleSidebar,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
}) => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <nav className="h-20 px-6 bg-gradient-to-r from-yellow-500 to-orange-400 flex items-center justify-between shadow-lg">
      {/* Dashboard Heading */}
      <h1 className="text-white font-bold text-lg sm:text-xl md:text-2xl">
        Property Management Dashboard
      </h1>

      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-yellow-500 font-bold text-lg">
          {user?.name?.charAt(0) || "U"}
        </div>
        <span className="text-white font-semibold text-lg hidden sm:block">
          {user?.name || "Guest"}
        </span>

        <button
          onClick={toggleSidebar}
          className="cursor-pointer sm:hidden text-white hover:text-gray-200 transition duration-200"
        >
          {isOpen ? <IoClose size={39} /> : <IoMenu size={39} />}
        </button>
      </div>
    </nav>
  );
};

export default NavbarComponent;
